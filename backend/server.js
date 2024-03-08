import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { productRoutes } from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { userRoutes } from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import { orderRoutes } from "./routes/orderRoutes.js";

dotenv.config();

connectDb();
const port = process.env.PORT || 5000;
const app = express();
console.log("sdsd");
// bosy parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get(".api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`port is running ${port}`));
