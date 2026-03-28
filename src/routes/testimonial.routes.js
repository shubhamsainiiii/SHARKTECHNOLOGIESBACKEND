import express from 'express';
import { createCRUD } from '../controllers/crud.controller.js';
import Testimonial from '../models/testimonial.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
const ctrl = createCRUD(Testimonial, 'Testimonial');

// Public (only published)
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Protected
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;