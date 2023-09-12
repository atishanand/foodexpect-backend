import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Lets build FoodExpect application 🏹</h1>");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
);
