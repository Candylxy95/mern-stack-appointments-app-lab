require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./src/db/db");
const appointmentRouter = require("./src/routers/appointments");
const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/users");
const isSignedIn = require("./src/middleware/is-signed-in");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use(isSignedIn);
app.use("/", appointmentRouter);
app.use("users/", userRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`SERVER running on port ${PORT}`);
});
