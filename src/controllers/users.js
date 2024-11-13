const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({ msg: "user not found" });
    }

    res.status(200).json({ msg: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
};
