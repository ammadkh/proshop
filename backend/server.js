import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { productRoutes } from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

connectDb();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("app is running");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`port is running ${port}`));