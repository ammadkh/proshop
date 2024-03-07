import { asyncHandler } from "../middleware/asyncHandler.js";
import { Order } from "../models/orderModel.js";

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (!orderItems || !orderItems.length) {
    res.status(400);
    throw new Error("no Order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("no order found");
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.json("update order to paid");
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.json("update order to delivered");
});

export const getOrders = asyncHandler(async (req, res) => {
  res.json("get orders");
});
