import express from 'express';
import { createCRUD } from '../controllers/crud.controller.js';
import Project from '../models/project.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
const ctrl = createCRUD(Project, 'Project');

// Public routes (frontend uses these)
router.get('/',           ctrl.getAll);
router.get('/slug/:slug', ctrl.getBySlug);
router.get('/:id',        ctrl.getOne);

// Protected routes (admin only)
router.post('/',    protect, ctrl.create);
router.put('/:id',  protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;