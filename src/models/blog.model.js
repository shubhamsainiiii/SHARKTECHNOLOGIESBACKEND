import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  category:    { type: String, required: true },
  status:      { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  excerpt:     { type: String, maxlength: 200 },
  content:     { type: String, required: true },
  coverImage:  { type: String },
  tags:        [{ type: String }],
  author:      { type: String, default: 'Admin' },
  readTime:    { type: String },
  metaTitle:   { type: String },
  metaDesc:    { type: String },
  views:       { type: Number, default: 0 },
  publishedAt: { type: Date },
}, { timestamps: true });

blogSchema.pre('validate', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  if (this.status === 'Published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model('Blog', blogSchema);