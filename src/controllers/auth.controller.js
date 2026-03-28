import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import { sendSuccess, sendError } from '../utils/response.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return sendError(res, 'Email and password required');

        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.matchPassword(password))) {
            return sendError(res, 'Invalid email or password', 401);
        }

        const token = signToken(admin._id);
        sendSuccess(res, { token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } }, 'Login successful');
    } catch (err) { next(err); }
};

// GET /api/auth/me
export const getMe = async (req, res, next) => {
    try {
        sendSuccess(res, req.admin, 'Admin fetched');
    } catch (err) { next(err); }
};

// POST /api/auth/change-password
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const admin = await Admin.findById(req.admin._id);

        if (!(await admin.matchPassword(currentPassword))) {
            return sendError(res, 'Current password is incorrect', 401);
        }
        admin.password = newPassword;
        await admin.save();
        sendSuccess(res, null, 'Password updated successfully');
    } catch (err) { next(err); }
};

// POST /api/auth/seed  (run once to create first admin)
// export const seed = async (req, res, next) => {
//   try {
//     if (process.env.NODE_ENV !== 'development') {
//       return sendError(res, 'Only available in development', 403);
//     }
//     const exists = await Admin.findOne({ email: 'admin@shark.dev' });
//     if (exists) return sendError(res, 'Admin already seeded');

//     await Admin.create({ name: 'Admin', email: 'admin@shark.dev', password: 'admin123', role: 'superadmin' });
//     sendSuccess(res, null, 'Admin seeded: admin@shark.dev / admin123', 201);
//   } catch (err) { next(err); }
// };



// POST /api/auth/register
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const exists = await Admin.findOne({ email });
        if (exists) return sendError(res, 'Admin already exists');

        const admin = await Admin.create({
            name,
            email,
            password,
            role: role || 'admin'
        });

        sendSuccess(res, admin, 'Admin created successfully', 201);
    } catch (err) {
        next(err);
    }
};