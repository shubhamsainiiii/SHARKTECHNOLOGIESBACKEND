import mongoose from 'mongoose';

// ── Stat ──
const statSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
    icon: { type: String, default: '📊' },
    color: { type: String, default: '#00d4ff' },
    description: { type: String },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const Stat = mongoose.model('Stat', statSchema);

// ── Team Member ──
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    bio: { type: String },
    avatar: { type: String },
    skills: [{ type: String }],
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    portfolio: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    order: { type: Number, default: 0 },
}, { timestamps: true });

export const TeamMember = mongoose.model('TeamMember', teamSchema);

// ── Settings (single document) ──
const settingsSchema = new mongoose.Schema({
    agencyName: { type: String, default: 'Shark Web & Cyber Solution' },
    tagline: { type: String },
    email: { type: String },
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    metaTitle: { type: String },
    metaDesc: { type: String },
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);