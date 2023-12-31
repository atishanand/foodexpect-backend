import express, { urlencoded } from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/errorMiddleWare.js";
import { connectPassport } from "./utils/Provider.js";
import userRoute from "./routes/user.js";
import orderRouter from "./routes/orders.js";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

app.enable("trust proxy");

connectPassport();

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRouter);

app.use(errorMiddleWare);

export default app;
