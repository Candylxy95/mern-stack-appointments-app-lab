import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import SummaryCard from "./SummaryCard";
import { useNavigate } from "react-router-dom";

const ApptList = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(UserContext);
  const [apptData, setApptData] = useState([]);
  const viewApptList = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/appointments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + accessToken,
        },
      });
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setApptData(data.appointment);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const viewDetailsClick = (id) => {
    navigate(`/appointments/${id}`);
  };

  useEffect(() => {
    viewApptList();
  }, []);

  return (
    <div className="apptList">
      {apptData.map((appt) => {
        return (
          <SummaryCard
            key={appt._id}
            title={appt.title}
            date={appt.date.split("T")[0]}
            time={appt.time}
            location={appt.location}
            onClick={() => viewDetailsClick(appt._id)}
          />
        );
      })}
    </div>
  );
};

export default ApptList;
