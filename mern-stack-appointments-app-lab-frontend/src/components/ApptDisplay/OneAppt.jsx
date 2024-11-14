import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { useParams } from "react-router-dom";
import ApptCard from "./ApptCard";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const OneAppt = () => {
  const navigate = useNavigate();
  const [apptData, setApptData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { accessToken } = useContext(UserContext);
  const { id } = useParams();

  const getOneAppt = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/appointments/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setApptData(data);
        setUpdatedData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteAppt = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/appointments/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setApptData(data);
      }
    } catch (error) {
      console.error(error.message);
    }
    navigate("/apptlist");
  };

  const updateAppt = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER + "/appointments/" + id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (!res.ok) {
        throw new Error("data error");
      } else {
        const data = await res.json();
        setApptData(data);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error(error.message);
    }
    getOneAppt(apptData._id);
  };

  const handleDelete = () => {
    setOpenModal(true);
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const submitUpdate = () => {
    updateAppt(apptData._id);
    getOneAppt(apptData._id);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    getOneAppt(id);
  }, [id]);

  return !openModal ? (
    <div className="oneAppt">
      {apptData ? (
        !isUpdating ? (
          <ApptCard
            key={apptData._id}
            title={apptData.title}
            type={apptData.type}
            purpose={apptData.purpose}
            location={apptData.location}
            address={apptData.address}
            attendee={apptData.attendee}
            date={apptData.date?.split("T")[0]}
            time={apptData.time}
            comments={apptData.comments}
            delete={handleDelete}
            update={handleUpdate}
          >
            Update
          </ApptCard>
        ) : (
          <ApptCard
            key={apptData._id}
            title={
              <input
                name="title"
                value={updatedData.title}
                onChange={handleUpdateChange}
              />
            }
            type={
              <input
                name="type"
                value={updatedData.type}
                onChange={handleUpdateChange}
              />
            }
            purpose={
              <input
                name="purpose"
                value={updatedData.purpose}
                onChange={handleUpdateChange}
              />
            }
            location={
              <input
                name="location"
                value={updatedData.location}
                onChange={handleUpdateChange}
              />
            }
            address={
              <input
                name="address"
                value={updatedData.address}
                onChange={handleUpdateChange}
              />
            }
            attendee={
              <input
                name="attendee"
                value={updatedData.attendee}
                onChange={handleUpdateChange}
              />
            }
            date={
              <input
                name="date"
                type="date"
                value={updatedData.date}
                onChange={handleUpdateChange}
              />
            }
            time={
              <input
                name="time"
                type="time"
                value={updatedData.time}
                onChange={handleUpdateChange}
              />
            }
            comments={
              <input
                name="comments"
                value={updatedData.comments}
                onChange={handleUpdateChange}
              />
            }
            delete={handleDelete}
            update={submitUpdate}
          >
            Submit
          </ApptCard>
        )
      ) : (
        <p>Loading appointment...</p>
      )}
    </div>
  ) : (
    <ConfirmModal
      setOpenModal={setOpenModal}
      delete={() => deleteAppt(apptData._id)}
    />
  );
};

export default OneAppt;
