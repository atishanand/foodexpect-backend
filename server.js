import app from "./app.js";
import { connectDB } from "./config/database.js";

connectDB();

app.get("/", (req, res) => {
  res.write(
    "<h1>API End Points of FoodExpect (online food delivery) application &#x1F37A</h1>"
  );
  res.write("<h2>For Developers Use Only</h2>");
  res.write("<p><b>GET Request</b></p>");
  res.write(
    "<p><b>/api/v1/googlelogin:</b> redirects you to google for authentication</p>"
  );
  res.write("<p><b>/api/v1/me:</b> displays your profile</p>");
  res.write(
    "<p><b>/api/v1/logout:</b> logouts the user from the application</p>"
  );
  res.write(
    "<p><b>/api/v1/admin/users:</b> displays all the users details to the admin</p>"
  );
  res.write(
    "<p><b>/api/v1/admin/stats:</b> displays usersCount, ordersCount, ordersStatus and totalIncome to the admin</p>"
  );
  res.write(
    "<p><b>/api/v1/myorders:</b> displays all your ordered food details</p>"
  );
  res.write(
    "<p><b>/api/v1/order/:id:</b> displays a particular ordered food details</p>"
  );
  res.write(
    "<p><b>/api/v1/admin/orders:</b> displays all the orders of all the users to the admin</p>"
  );
  res.write(
    "<p><b>/api/v1/admin/order/:id:</b> changes the order status of a particular food order by the admin</p>"
  );
  res.write("<p><b>POST Request</b></p>");
  res.write("<p><b>/api/v1/createorder:</b> places your food order</p>");
  res.send();
});

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  )
);
