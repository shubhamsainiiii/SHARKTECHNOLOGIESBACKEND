import express from 'express';
import { createCRUD } from '../controllers/crud.controller.js';
import Blog from '../models/blog.model.js';
import { protect } from '../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../utils/response.js';

const router = express.Router();
const ctrl = createCRUD(Blog, 'Blog');

// Public
router.get('/', ctrl.getAll);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id', ctrl.getOne);

// Increment views — public
router.patch('/:id/views', async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!blog) return sendError(res, 'Blog not found', 404);
        sendSuccess(res, { views: blog.views });
    } catch (err) { next(err); }
});

// Protected
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;