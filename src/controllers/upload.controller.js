import cloudinary from '../config/cloudinary.js';
import { sendSuccess, sendError } from '../utils/response.js';

// POST /api/upload
// Flow: Admin selects image → multer reads to memory buffer
//       → buffer converted to base64 → uploaded to Cloudinary
//       → Cloudinary returns URL → URL saved in DB (not the file)
export const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) return sendError(res, 'No file provided', 400);

        // Convert buffer → base64 data URI
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'shark-agency',   // Cloudinary folder name
            resource_type: 'auto',
            transformation: [
                { quality: 'auto', fetch_format: 'auto' }, // auto optimize
            ],
        });

        // Return the URL — frontend saves this URL in DB, not the file
        sendSuccess(res, {
            url: result.secure_url,   // ← this gets saved in MongoDB
            publicId: result.public_id,    // ← needed for deletion later
            width: result.width,
            height: result.height,
            format: result.format,
            size: req.file.size,
        }, 'Image uploaded successfully', 201);

    } catch (err) { next(err); }
};

// DELETE /api/upload/:publicId
// Deletes image from Cloudinary using publicId
export const deleteImage = async (req, res, next) => {
    try {
        const publicId = decodeURIComponent(req.params.publicId);
        if (!publicId) return sendError(res, 'Public ID required', 400);

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== 'ok') {
            return sendError(res, 'Failed to delete image from Cloudinary', 400);
        }

        sendSuccess(res, null, 'Image deleted successfully');
    } catch (err) { next(err); }
};