import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import experienceRoutes from "./routes/experience.routes.js";
import bookingRouter from "./routes/booking.route.js";
import promoRouter from "./routes/promo.routes.js";

const app = express();

// Middlewares
app.use(cors(
  {
    origin: ["https://book-it-theta-kohl.vercel.app", "http://localhost:5173"]
  }
));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API running...");
});
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRouter);
app.use("/api/promo", promoRouter);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
