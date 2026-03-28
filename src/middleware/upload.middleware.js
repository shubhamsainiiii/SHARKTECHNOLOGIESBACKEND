import multer from 'multer';
import path from 'path';

// Memory storage only — file goes directly to Cloudinary, no local folder
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only images allowed: jpeg, jpg, png, gif, webp'));
};

const upload = multer({
    storage,          // RAM only — no disk write
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

export default upload;