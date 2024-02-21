import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import { Order } from "./models/orderModel.js";
import { Users } from "./data/users.js";
import { User } from "./models/userModel.js";
import { Product } from "./models/productModel.js";
import products from "./data/products.js";
import colors from "colors";

dotenv.config();
connectDb();
console.log("seeder");

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(Users);
    const adminUser = createdUser[0]?._id;
    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProduct);
    console.log("data imported".green );
    process.exit();
  } catch (error) {
    console.log(error, "data import error".red);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error, "data delete  error".red);
    process.exit(1);
  }
};

if (process.argv[2] === "d") {
  destroyData();
} else {
  importData();
}
