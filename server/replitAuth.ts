import session from "express-session";
import type { Express, RequestHandler } from "express";
import MemoryStore from "memorystore";
import type { User } from "@shared/schema";

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@innovixus.com";
const ADMIN_PASSWORD = "innovixus123";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const MemStore = MemoryStore(session);

  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-key",
    store: new MemStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());

  // Login route - hardcoded credentials
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user: User = {
        id: "admin-1",
        email: ADMIN_EMAIL,
        firstName: "Admin",
        lastName: "User",
      };

      (req.session as any).user = user;
      res.json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  // Logout route
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out" });
    });
  });
}

// Middleware to check authentication
export const isAuthenticated: RequestHandler = (req, res, next) => {
  const user = (req.session as any)?.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
