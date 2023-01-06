const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const sicboRoute = require("./routes/sicbo");
// const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const blogRoute = require("./routes/blog");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const commentRoute = require("./routes/comment");

// const stripeRoute = require("./routes/stripe");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/order", orderRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/sicbo", sicboRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT, () => {
  console.log("Backend server is running!");
});
