import React, { useContext } from "react";
import Authform from "./Authform";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const login = async (inputs) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json(); //getback token

      if (res.ok) {
        userCtx.setAccessToken(data.access);
        const decoded = jwtDecode(data.access);
        console.log("successful signin");
      } else {
        console.error(data);
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error(error.message);
    }
    navigate("/apptlist");
  };

  return (
    <div className="authBody">
      <Authform confirmation={false} msg="Login" onClick={login} />
    </div>
  );
};

export default LoginPage;
