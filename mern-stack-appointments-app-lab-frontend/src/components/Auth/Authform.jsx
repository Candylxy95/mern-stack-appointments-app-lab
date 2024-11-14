import React, { useState } from "react";

const Authform = (props) => {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNotPassword, setIsNotPassword] = useState(true);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handlePasswordCheck = (e) => {
    const { name, value } = e.target;
    setConfirmPassword(value);
    if (value === userInput.password) {
      setIsNotPassword(false);
    } else setIsNotPassword(true);
  };

  const handleSubmit = () => {
    props.onClick(userInput);
    setUserInput({ username: "", password: "" });
    setConfirmPassword("");
    setIsNotPassword(true);
  };

  return (
    <div className="authForm">
      <h1>{props.msg}</h1>
      <input
        name="username"
        type="text"
        placeholder="Username"
        value={userInput.username}
        onChange={handleUserChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={userInput.password}
        onChange={handleUserChange}
      />
      {props.confirmation && (
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handlePasswordCheck}
        />
      )}
      <button
        type="submit"
        disabled={props.confirmation && isNotPassword}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Authform;
