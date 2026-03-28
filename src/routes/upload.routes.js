import express from 'express';
import { uploadImage, deleteImage } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// POST /api/upload
// Admin uploads image → stored in Cloudinary → returns URL
router.post('/', protect, upload.single('image'), uploadImage);

// DELETE /api/upload/:publicId
router.delete('/:publicId', protect, deleteImage);

export default router;