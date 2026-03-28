// import mongoose from 'mongoose';

// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true, trim: true },
//     slug: { type: String, required: true, unique: true, lowercase: true },
//     category: { type: String, required: true, enum: ['Web App', 'Mobile', 'E-Commerce', 'Full-Stack', 'UI/UX', 'API'] },
//     status: { type: String, enum: ['Draft', 'Live', 'Archived'], default: 'Draft' },
//     shortDesc: { type: String, required: true, maxlength: 200 },
//     longDesc: { type: String },
//     tech: [{ type: String }],
//     coverImage: { type: String },
//     images: [{ type: String }],
//     liveUrl: { type: String },
//     githubUrl: { type: String },
//     featured: { type: Boolean, default: false },
//     year: { type: String },
//     results: [{ type: String }],
//     order: { type: Number, default: 0 },
// }, { timestamps: true });

// // Auto-generate slug
// projectSchema.pre('validate', function (next) {
//     if (this.isModified('title') && !this.slug) {
//         this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
//     }
//     next();
// });

// export default mongoose.model('Project', projectSchema);



import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    category: { type: String, required: true, enum: ['Web App', 'Mobile', 'E-Commerce', 'Full-Stack', 'UI/UX', 'API'] },
    status: { type: String, enum: ['Draft', 'Live', 'Archived'], default: 'Draft' },
    shortDesc: { type: String, maxlength: 200 },
    longDesc: { type: String },
    tech: [{ type: String }],
    coverImage: { type: String, default: '' },
    images: [{ type: String }],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    year: { type: String, default: '' },
    results: [{ type: String }],
    color: { type: String, default: '' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

// Auto-generate slug from title
projectSchema.pre('save', function () {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

export default mongoose.model('Project', projectSchema);