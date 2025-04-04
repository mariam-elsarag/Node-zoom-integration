import React, { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Cookies from "js-cookie";

const Auth_Layout = lazy(() => import("./components/layout/Auth_Layout"));
const Unauth_Layout = lazy(() => import("./components/layout/UnAuth_Layout"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

// _________________________ auth layout ________________________

const Home = lazy(() => import("./pages/Home/Home"));
const Meeting = lazy(() => import("./pages/meeting/Meeting"));

const App = () => {
  const { token } = useAuth();

  return (
    <Suspense>
      <Routes location={location} key={location.pathname}>
        {token ? (
          <Route path="/" element={<Auth_Layout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="upcoming" element={<Meeting />} />
            <Route path="previous" element={<Meeting />} />
          </Route>
        ) : (
          <Route path="/" element={<Unauth_Layout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="Register" element={<Register />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
