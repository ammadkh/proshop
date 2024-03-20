import { asyncHandler } from "../middleware/asyncHandler.js";
import { Product } from "../models/productModel.js";

export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = +req.query.pageNumber || 1;
  const keyword = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "sample name",
    image: "./assets/logo.png",
    brand: "sample brand",
    category: "sample category",
    description: "sample description",
    reviews: [],
    rating: 0,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });
  const createdProduct = await product.save();
  res.status(202).json(createdProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(202).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await Product.deleteOne({ _id: id });
    res.status(202).json("product deleted");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export const createProductReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment, rating } = req.body;
  const product = await Product.findById(id);
  if (product) {
    const alreadyReviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewExists) {
      res.status(404);
      throw new Error("Comment already exists");
    }
    const review = {
      name: req.user.name,
      user: req.user._id,
      rating: +rating,
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, current) => sum + current.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(202).json("review added");
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
