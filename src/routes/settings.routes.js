import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public (frontend needs agency name, social links, etc.)
router.get('/', getSettings);

// Protected
router.put('/', protect, updateSettings);

export default router;