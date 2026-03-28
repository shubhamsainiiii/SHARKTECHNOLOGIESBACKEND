import express from 'express';
import { createCRUD } from '../controllers/crud.controller.js';
import { TeamMember } from '../models/misc.models.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
const ctrl = createCRUD(TeamMember, 'TeamMember');

// Public
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Protected
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;