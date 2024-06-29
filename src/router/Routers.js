import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loading from "../assets/loading/Loading";
import { Typography } from "@mui/material";
import PageNotFound from "../assets/pagenotfound/PageNotFound ";
import Login from "../container/auth/Login";
import UserDashboard from "../container/userdashboardlayout/UserDashboard";
import UserList from "../container/userlist/UserList";
import Register from "../container/auth/Register";
import UserProfile from "../container/userprofile/UserProfile";
const CkEditorAboutUs = lazy(() => import("../container/cms"));
const SignIn = lazy(() => import("../components/signin/SignIn"));
const TableList = lazy(() => import("../components/table/TableList"));
const DashboardDatePicker = lazy(() =>
  import("../pages/sidebar/DashboardDatePicker")
);

const DashboardLayout = lazy(() =>
  import("../components/dashboardlayout/DashboardLayout")
);

const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/datepicker" element={<DashboardDatePicker />} />
          <Route path="/dataTable" element={<TableList />} />
          <Route path="/cms" element={<CkEditorAboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdashboard" element={<UserDashboard />}>
            <Route path="userlist" element={<UserList />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
