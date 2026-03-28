// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';

// import connectDB from './config/db.js';

// // Routes
// import authRoutes from './routes/auth.routes.js';
// import projectRoutes from './routes/project.routes.js';
// import serviceRoutes from './routes/service.routes.js';
// import testimonialRoutes from './routes/testimonial.routes.js';
// import blogRoutes from './routes/blog.routes.js';
// import statsRoutes from './routes/stats.routes.js';
// import teamRoutes from './routes/team.routes.js';
// import settingsRoutes from './routes/settings.routes.js';
// import dashboardRoutes from './routes/dashboard.routes.js';
// import uploadRoutes from './routes/upload.routes.js';

// import { notFound, errorHandler } from './middleware/error.middleware.js';

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ── Connect DB ──
// connectDB();

// // ── Security middleware ──
// app.use(helmet());
// app.use(cors({
//     origin: [
//         process.env.FRONTEND_URL || 'http://localhost:5173',
//         process.env.ADMIN_URL || 'http://localhost:5174',
//     ],
//     credentials: true,
// }));

// // ── Rate limiting ──
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100,
//     message: { success: false, message: 'Too many requests, please try again later.' },
// });
// app.use('/api/', limiter);

// // ── Body parsers ──
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // ── Logger (dev only) ──
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// // ── Health check ──
// app.get('/api/health', (req, res) => res.json({ success: true, message: 'Shark API is running 🦈', env: process.env.NODE_ENV }));

// // ── Routes ──
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/testimonials', testimonialRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/stats', statsRoutes);
// app.use('/api/team', teamRoutes);
// app.use('/api/settings', settingsRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/upload', uploadRoutes);

// // ── Error handlers ──
// app.use(notFound);
// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT} [${process.env.NODE_ENV}]`);
// });



import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});