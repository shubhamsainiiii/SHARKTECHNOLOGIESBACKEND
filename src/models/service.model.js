import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    icon: { type: String, default: '🌐' },
    tagline: { type: String, default: '' },
    shortDesc: { type: String, default: '' },
    longDesc: { type: String, default: '' },
    features: [{ type: String }],
    accent: { type: String, default: '#00d4ff' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-generate slug
serviceSchema.pre('save', function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

export default mongoose.model('Service', serviceSchema);