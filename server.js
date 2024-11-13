require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./src/db/db");
const auth = require("./src/routers/auth");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const appointmentRouter = require("./src/routers/appointments");
const authRouter = require("./src/routers/auth");
const userRouter = require("./src/routers/users");
const isSignedIn = require("./src/middleware/is-signed-in");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

connectDB();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use(isSignedIn);
app.use("/users", userRouter);
app.use("/", appointmentRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`SERVER running on port ${PORT}`);
});
