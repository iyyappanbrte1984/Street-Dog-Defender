import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import path from 'path';
import { fileURLToPath } from 'url'; // <--- 1. NEW IMPORT

// <--- 2. MANUALLY CREATE __dirname (Fixes the error) --->
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// <--- 3. NOW THIS WILL WORK --->
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// ==========================================
// DATABASE CONNECTION
// ==========================================
const MONGO_URI = process.env.MONGO_URI || "";

// Debugging: Print to console
console.log("🔍 Checking MongoDB URI...");
if (MONGO_URI) {
  // Show first 10 chars only for security
  console.log("✅ Key Found in env: ", MONGO_URI.substring(0, 10) + "...");
} else {
  console.log("❌ Key is Empty! Server cannot connect.");
}

if (!MONGO_URI) {
  console.error("❌ FATAL ERROR: MONGO_URI is missing. Check .env file in the root folder.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// SCHEMAS & MODELS
// ==========================================
const PreOrderSchema = new mongoose.Schema({
  name: String, organization: String, phone: String, email: String, 
  city: String, quantity: String, useCase: String, role: String, 
  date: { type: Date, default: Date.now }
});
const PreOrder = mongoose.model('PreOrder', PreOrderSchema);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const ParentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  studentName: String,
  studentID: String
});
const Parent = mongoose.models.Parent || mongoose.model('Parent', ParentSchema);

// ==========================================
// ROUTES
// ==========================================

// Admin Login
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({ success: true, message: 'Success' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Parent Register
app.post('/api/parent/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await Parent.findOne({ email: req.body.email });
    if (existing) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }
    const newParent = new Parent(req.body);
    await newParent.save();
    res.status(201).json({ success: true, message: 'Parent Registered!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Parent Login
app.post('/api/parent/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const parent = await Parent.findOne({ email, password });
    if (parent) {
      res.status(200).json({ 
        success: true, 
        user: { name: parent.fullName, child: parent.studentName, deviceID: parent.studentID } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// Admin Setup
app.get('/api/setup-admin', async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      res.send('Admin already exists.');
    } else {
      const newAdmin = new User({ username: 'admin', password: 'securepassword2026' });
      await newAdmin.save();
      res.send('Admin Created');
    }
  } catch (error) { res.status(500).send('Error'); }
});

// Pre-Orders
app.post('/api/preorder', async (req: Request, res: Response): Promise<void> => {
  try {
    await new PreOrder(req.body).save();
    res.status(201).json({ success: true });
  } catch (error) { res.status(500).json({ success: false }); }
});

app.get('/api/preorder', async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await PreOrder.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (error) { res.status(500).json({ success: false }); }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));