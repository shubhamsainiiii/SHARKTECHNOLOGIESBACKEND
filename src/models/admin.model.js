// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const adminSchema = new mongoose.Schema({
//   name:     { type: String, required: true, trim: true },
//   email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password: { type: String, required: true, minlength: 6 },
//   role:     { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
// }, { timestamps: true });

// // Hash password before save
// adminSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password
// adminSchema.methods.matchPassword = async function (entered) {
//   return bcrypt.compare(entered, this.password);
// };

// export default mongoose.model('Admin', adminSchema);



import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
}, { timestamps: true });

// Hash password before save
adminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password
adminSchema.methods.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
};

export default mongoose.model('Admin', adminSchema);