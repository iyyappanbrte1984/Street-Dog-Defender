import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows reading JSON body

// Database Connection
const MONGO_URI = "mongodb+srv://iyyanathi_db_user:SwiQ8vynPWayadRD@cluster0.zxumjho.mongodb.net/sddproject?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// SCHEMAS (Data Models)
// ==========================================

// 1. Pre-Order Schema
const PreOrderSchema = new mongoose.Schema({
  name: String, organization: String, phone: String, email: String, 
  city: String, quantity: String, useCase: String, role: String, 
  date: { type: Date, default: Date.now }
});
const PreOrder = mongoose.model('PreOrder', PreOrderSchema);

// 2. Admin User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
// Check if model exists before creating (Prevents crashes)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// 3. Parent Schema
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

// --- ADMIN LOGIN ---
app.post('/api/login', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🔐 Admin Login Attempt:", req.body); 

    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, message: 'Missing fields' });
      return;
    }

    const user = await User.findOne({ username, password });
    
    if (user) {
      console.log("✅ Admin Login Success");
      res.status(200).json({ success: true, message: 'Success' });
    } else {
      console.log("❌ Admin Login Failed: Wrong credentials");
      res.status(401).json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.error("🔥 ADMIN LOGIN CRASH:", error); 
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// --- PARENT REGISTER ---
app.post('/api/parent/register', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("📝 Registering Parent:", req.body.email);

    const existing = await Parent.findOne({ email: req.body.email });
    if (existing) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }
    const newParent = new Parent(req.body);
    await newParent.save();
    
    console.log("✅ Parent Registered");
    res.status(201).json({ success: true, message: 'Parent Registered!' });
  } catch (error) {
    console.error("🔥 REGISTER CRASH:", error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// --- PARENT LOGIN ---
app.post('/api/parent/login', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("👨‍👩‍👧 Parent Login Attempt:", req.body);

    const { email, password } = req.body;
    const parent = await Parent.findOne({ email, password });
    
    if (parent) {
      console.log("✅ Parent Login Success");
      res.status(200).json({ 
        success: true, 
        user: { name: parent.fullName, child: parent.studentName, deviceID: parent.studentID } 
      });
    } else {
      console.log("❌ Parent Login Failed");
      res.status(401).json({ success: false, message: 'Invalid Email or Password' });
    }
  } catch (error) {
    console.error("🔥 PARENT LOGIN CRASH:", error);
    res.status(500).json({ success: false });
  }
});

// --- ADMIN SETUP ---
app.get('/api/setup-admin', async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      res.send('Admin already exists.');
    } else {
      const newAdmin = new User({ username: 'admin', password: 'securepassword2026' });
      await newAdmin.save();
      res.send('Admin Created: admin / securepassword2026');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// --- PRE-ORDER ROUTES ---
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

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));