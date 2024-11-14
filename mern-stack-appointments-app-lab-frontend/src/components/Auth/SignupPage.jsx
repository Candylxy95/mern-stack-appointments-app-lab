import React from "react";
import Authform from "./Authform";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const SignupPage = (props) => {
  const navigate = useNavigate();
  const signUp = async (inputs) => {
    try {
      const res = await fetch(import.meta.env.VITE_SERVER + "/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (!res.ok) {
        throw new Error("data error");
      } else console.log("successful sign up");
    } catch (error) {
      console.error(error.message);
    }
    props.setShowLogin(true);
  };

  return (
    <div className="authBody">
      <Authform
        confirmation={true}
        msg="Sign up now. Start managing your appointments today"
        onClick={signUp}
      />
    </div>
  );
};

export default SignupPage;
