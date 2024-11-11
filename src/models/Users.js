const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: "userRef",
  }
);

usersSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    delete returnedObj.password;
  },
});

const User = mongoose.model("users", usersSchema);
module.exports = User;
