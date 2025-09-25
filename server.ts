import express from "express";
import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./router/products";
import productApiRoutes from "./router/products.api";
import ErrorMiddleware from "./middleware/Error";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();


// 👇 حل مشكلة __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 👇 ده يخلي أي حاجة جوه public متاحة على /styles أو /images إلخ
app.use(express.static(path.join(__dirname, "public")));

// إعداد pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());

// protect headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    xFrameOptions: { action: "deny" },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

// ✅ Products routes (pages) and API routes
app.use("/products", productRoutes);
app.use("/api/products", productApiRoutes);

// Redirect root to products
app.get("/", (req: Request, res: Response) => {
  res.redirect("/products");
});

// Catch-all 404
app.use((req: Request, res: Response) => {
  res.status(404).render("notfound", { title: "Page Not Found" });
});

// Error handling middleware
app.use(ErrorMiddleware.handle);

export default app;

