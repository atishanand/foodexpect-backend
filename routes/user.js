import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controllers/user.js";
import {
  authorizeAdmin,
  getAdminStats,
  getAdminUsers,
  isAuthenticated,
} from "../middlewares/auth.js";

const userRoute = express.Router();

userRoute.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile"],
    prompt: "select_account",
  })
);

userRoute.get(
  "/login",
  passport.authenticate("google", { successRedirect: process.env.FRONTEND_URL })
);

userRoute.get("/me", isAuthenticated, myProfile);
userRoute.get("/logout", logout);
userRoute.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);
userRoute.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default userRoute;
