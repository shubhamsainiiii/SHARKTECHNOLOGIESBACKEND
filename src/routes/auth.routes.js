import express from 'express';
import { login, getMe, changePassword, register } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
// router.post('/seed', seed);           // dev only — creates first admin
router.get('/me', protect, getMe);
router.post('/change-password', protect, changePassword);
router.post('/register', register);

export default router;