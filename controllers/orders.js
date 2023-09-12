import { asyncError } from "../middlewares/errorMiddleWare.js";
import { Order } from "../models/Orders.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const placeOrder = asyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharge,
    totalAmount,
  } = req.body;

  const user = req.user._id;

  const orderOptions = {
    shippingInfo,
    orderedItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingCharge,
    totalAmount,
    user,
  };

  await Order.create(orderOptions);

  res.status(201).json({
    success: true,
    message: "Order Placed Successfully",
  });
});

export const getMyOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name"
  );

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrderDetails = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  res.status(200).json({
    success: true,
    order,
  });
});

export const getAdminOrders = asyncError(async (req, res, next) => {
  const orders = await Order.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    orders,
  });
});

export const processOrder = asyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

  if (order.orderStatus === "Preparing") order.orderStatus = "Shipped";
  else if (order.orderStatus === "Shipped") {
    order.orderStatus = "Delivered";
    order.deliveredAt = new Date(Date.now());
  } else if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("Food already delivered...", 400));

  await order.save();

  res.status(200).json({
    success: true,
    message: "Order Status Updated Successfully",
  });
});
