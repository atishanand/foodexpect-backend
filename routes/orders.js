import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  placeOrder,
  processOrder,
} from "../controllers/orders.js";

const orderRouter = express.Router();

orderRouter.post("/createorder", isAuthenticated, placeOrder);
orderRouter.get("/myorders", isAuthenticated, getMyOrders);
orderRouter.get("/order/:id", isAuthenticated, getOrderDetails);
orderRouter.get(
  "/admin/orders",
  isAuthenticated,
  authorizeAdmin,
  getAdminOrders
);
orderRouter.get(
  "/admin/order/:id",
  isAuthenticated,
  authorizeAdmin,
  processOrder
);

export default orderRouter;
