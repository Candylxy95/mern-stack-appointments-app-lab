const Appointment = require("../models/appointment");
const User = require("../models/users");

const viewAllAppt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }

    const appointments = await Appointment.find({ owner: user._id });

    res.status(200).json({ appointment: appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAppt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const appointment = await Appointment.create({
      title: req.body.title,
      type: req.body.type,
      purpose: req.body.purpose,
      location: req.body.location,
      address: req.body.address,
      attendee: req.body.attendee,
      date: req.body.date,
      time: req.body.time,
      comments: req.body.comments,
      owner: user._id,
    });
    res.status(200).json({ msg: `${appointment} successfully added` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewOneAppt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAppt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const deletedAppt = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppt) {
      return res.status(404).json({ msg: "Appointment not found" });
    }
    res.status(200).json({ msg: "appointment has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOneAppt = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "user not found" });
    }
    const updateAppt = {};
    if ("title" in req.body) updateAppt.title = req.body.title;
    if ("type" in req.body) updateAppt.type = req.body.type;
    if ("purpose" in req.body) updateAppt.purpose = req.body.purpose;
    if ("location" in req.body) updateAppt.location = req.body.location;
    if ("address" in req.body) updateAppt.address = req.body.address;
    if ("attendee" in req.body) updateAppt.attendee = req.body.attendee;
    if ("date" in req.body) updateAppt.date = req.body.date;
    if ("comments" in req.body) updateAppt.comments = req.body.comments;

    const updatedAppt = await Appointment.findByIdAndUpdate(
      req.params.id,
      updateAppt,
      { new: true }
    );

    res.json({ status: "ok", msg: `Appointment updated to ${updatedAppt}` });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", msg: "error updating appoinment" });
  }
};

module.exports = {
  viewAllAppt,
  viewOneAppt,
  addAppt,
  deleteAppt,
  updateOneAppt,
};
