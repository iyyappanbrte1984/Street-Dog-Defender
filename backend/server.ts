import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

/* ======================================================
   ESM FIX: DEFINE __dirname
====================================================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ======================================================
   LOAD ENV (ONLY ONCE, CORRECTLY)
====================================================== */
dotenv.config({
  path: path.join(__dirname, ".env"),
});

/* ======================================================
   VALIDATE ENV
====================================================== */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ FATAL ERROR: MONGO_URI is missing");
  process.exit(1);
}

/* ======================================================
   APP SETUP
====================================================== */
const app = express();

app.use(cors({
  origin: "*", // later you can restrict to Vercel domain
}));
app.use(express.json());

/* ======================================================
   DATABASE CONNECTION
====================================================== */
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

/* ======================================================
   SCHEMAS & MODELS
====================================================== */
const PreOrderSchema = new mongoose.Schema({
  name: String,
  organization: String,
  phone: String,
  email: String,
  city: String,
  quantity: String,
  useCase: String,
  role: String,
  date: { type: Date, default: Date.now },
});
const PreOrder = mongoose.model("PreOrder", PreOrderSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const ParentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  studentName: String,
  studentID: String,
});
const Parent = mongoose.models.Parent || mongoose.model("Parent", ParentSchema);

/* ======================================================
   ROUTES
====================================================== */

// Root
app.get("/", (_req, res) => {
  res.send("Street Dog Defender Backend is running 🚀");
});

// Health
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Street Dog Defender Backend",
    time: new Date().toISOString(),
  });
});

// Admin Login
app.post("/api/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    res.status(401).json({ success: false });
    return;
  }
  res.json({ success: true });
});

// Parent Register
app.post("/api/parent/register", async (req, res) => {
  const exists = await Parent.findOne({ email: req.body.email });
  if (exists) {
    res.status(400).json({ success: false, message: "Email exists" });
    return;
  }
  await new Parent(req.body).save();
  res.status(201).json({ success: true });
});

// Parent Login
app.post("/api/parent/login", async (req, res) => {
  const { email, password } = req.body;
  const parent = await Parent.findOne({ email, password });
  if (!parent) {
    res.status(401).json({ success: false });
    return;
  }
  res.json({
    success: true,
    user: {
      name: parent.fullName,
      child: parent.studentName,
      deviceID: parent.studentID,
    },
  });
});

// Admin Setup (run ONCE, then delete route)
app.get("/api/setup-admin", async (_req, res) => {
  const exists = await User.findOne({ username: "admin" });
  if (exists) {
    res.send("Admin already exists");
    return;
  }
  await new User({
    username: "admin",
    password: "securepassword2026",
  }).save();
  res.send("Admin created");
});

// Preorders
app.post("/api/preorder", async (req, res) => {
  await new PreOrder(req.body).save();
  res.status(201).json({ success: true });
});

app.get("/api/preorder", async (_req, res) => {
  const orders = await PreOrder.find().sort({ date: -1 });
  res.json(orders);
});

/* ======================================================
   START SERVER
====================================================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
