import express from "express";
import products from "./data/product.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("app is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.send(product);
});
app.listen(port, () => console.log(`port is running ${port}`));
