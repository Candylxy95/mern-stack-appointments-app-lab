import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import SignupPage from "./components/Auth/SignupPage";
import ApptForm from "./components/ApptDisplay/ApptForm";
import UserContext from "./components/context/user";
import ApptList from "./components/ApptDisplay/ApptList";
import OneAppt from "./components/ApptDisplay/oneAppt";
import NotFound from "./components/NotFound";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ accessToken, setAccessToken }}>
        <NavBar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          {accessToken.length === 0 && (
            <Route
              path="/"
              element={
                showLogin ? (
                  <LoginPage />
                ) : (
                  <SignupPage setShowLogin={setShowLogin} />
                )
              }
            />
          )}
          {accessToken.length > 0 && (
            <>
              <Route path="/addappt" element={<ApptForm />} />
              <Route path="/apptlist" element={<ApptList />} />
              <Route path="/appointments/:id" element={<OneAppt />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
