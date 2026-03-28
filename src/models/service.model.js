import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    icon: { type: String, default: '🌐' },
    tagline: { type: String },
    shortDesc: { type: String, required: true },
    longDesc: { type: String },
    features: [{ type: String }],
    accent: { type: String, default: '#00d4ff' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

serviceSchema.pre('validate', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

export default mongoose.model('Service', serviceSchema);