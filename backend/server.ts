import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin:
      (process.env.CORS_ORIGIN?.split(",") as string[]) || [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Friendly root route for browser checks
app.get("/", (_req, res) => {
  res
    .type("text/plain")
    .send("Energy Nexus API is running. Try GET /health or /api/ping");
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Simple API ping for browser testing
app.get("/api", (_req, res) =>
  res.json({
    ok: true,
    service: "energy-nexus",
    endpoints: [
      "/api/ping",
      "/api/auth/signup (POST)",
      "/api/auth/login (POST)",
    ],
  })
);
app.get("/api/ping", (_req, res) =>
  res.json({ pong: true, time: new Date().toISOString() })
);

// In-memory user store for initial testing
const users = new Map<string, any>();

// Seed default accounts to bypass OTP during development
(async () => {
  // PowerPool user
  const email1 = "PowerPool@energynexus.com";
  const phone1 = "8840776158";
  const fullName1 = "PowerPool Admin";
  const pincode1 = "110001";
  const password1 = "powerpool@login";
  const key1 = email1.toLowerCase();

  if (!users.has(key1)) {
    const passwordHash1 = await bcrypt.hash(password1, 10);
    const user1 = {
      id: key1,
      fullName: fullName1,
      email: key1,
      phone: phone1,
      pincode: pincode1,
      language: "en",
    };
    users.set(key1, { ...user1, passwordHash: passwordHash1 });
  }

  // Vivek user
  const email2 = "vivek@example.com";
  const phone2 = "8840776158";
  const fullName2 = "Vivek Tripathi";
  const pincode2 = "201001";
  const password2 = "hello@123";
  const key2 = email2.toLowerCase();

  if (!users.has(key2)) {
    const passwordHash2 = await bcrypt.hash(password2, 10);
    const user2 = {
      id: key2,
      fullName: fullName2,
      email: key2,
      phone: phone2,
      pincode: pincode2,
      language: "en",
    };
    users.set(key2, { ...user2, passwordHash: passwordHash2 });
  }
})();

// ----------------- SIGNUP -----------------
const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  pincode: z.string().min(4),
  language: z.string().optional(),
  agree: z.boolean().optional(),
});

app.post("/api/auth/signup", async (req, res) => {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { fullName, email, phone, password, pincode, language } = parsed.data;
  const key = email.toLowerCase();

  if (users.has(key))
    return res.status(409).json({ message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: key,
    fullName,
    email: key,
    phone,
    pincode,
    language: language || "en",
  };

  users.set(key, { ...user, passwordHash });

  const token = jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// ----------------- LOGIN -----------------
const loginSchema = z.object({
  identifier: z.string().min(3), // email ya phone dono aa sakta hai
  password: z.string().min(8),
});

app.post("/api/auth/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const { identifier, password } = parsed.data;

  // check if identifier is email or phone
  let record;
  if (identifier.includes("@")) {
    // treat as email
    record = users.get(identifier.toLowerCase());
  } else {
    // treat as phone
    record = Array.from(users.values()).find((u) => u.phone === identifier);
  }

  if (!record) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, record.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const { passwordHash, ...user } = record;
  const token = jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET || "dev-secret",
    { expiresIn: "7d" }
  );

  res.json({ token, user });
});

// ----------------- LOGOUT -----------------
app.post("/api/auth/logout", (_req, res) => {
  res.json({ success: true });
});

// 404 handler for unknown API routes
app.use("/api", (_req, res) => {
  res.status(404).json({
    message: "API route not found",
    try: [
      "/api/ping",
      "/api/auth/signup (POST)",
      "/api/auth/login (POST)",
    ],
  });
});

const port = parseInt(process.env.PORT || "4000", 10);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});

