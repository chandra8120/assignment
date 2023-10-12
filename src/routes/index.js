import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

import RequireAuth from "./RequireAuth";
import Login from "../Login/Login";
import SignUpForm from "../Signup/SignUpForm";
import Edit from "../Add_Edit/Edit";
import Add from "../Add_Edit/Add";
import DrawerAppBar from "./Design";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <DrawerAppBar>
                <Home />
              </DrawerAppBar>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/edit/:userId"
          element={
            <DrawerAppBar>
              <Edit />
            </DrawerAppBar>
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/add"
          element={
            <DrawerAppBar>
              <Add />
            </DrawerAppBar>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
