const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    attendee: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { collection: "appointmentsRef" }
);

const Appointment = mongoose.model("appointments", appointmentSchema);
module.exports = Appointment;
