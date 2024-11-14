import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

const ApptForm = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    purpose: "",
    location: "",
    address: "",
    attendee: "",
    date: "",
    time: "",
    comments: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addApptData = async (formData) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("data error");
      } else {
        console.log(`${formData} successfully added`);
      }
    } catch (error) {
      console.error(error.message);
    }

    setFormData({
      title: "",
      type: "",
      purpose: "",
      location: "",
      address: "",
      attendee: "",
      date: "",
      time: "",
      comments: "",
    });

    navigate("/apptlist");
  };

  return (
    <div className="authBody">
      <div className="apptForm">
        <h1>Add an appointment</h1>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleUserChange}
        />
        <input
          name="type"
          type="text"
          placeholder="Type"
          value={formData.type}
          onChange={handleUserChange}
        />
        <input
          name="purpose"
          type="text"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleUserChange}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleUserChange}
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={handleUserChange}
        />
        <input
          name="attendee"
          type="text"
          placeholder="Attendee"
          value={formData.attendee}
          onChange={handleUserChange}
        />
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleUserChange}
        />
        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleUserChange}
        />
        <input
          name="comments"
          type="text"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleUserChange}
        />
        <button type="submit" onClick={() => addApptData(formData)}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ApptForm;
