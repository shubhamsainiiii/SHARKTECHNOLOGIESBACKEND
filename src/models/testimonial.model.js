import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String },
    company: { type: String },
    avatar: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    project: { type: String },
    date: { type: String },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);