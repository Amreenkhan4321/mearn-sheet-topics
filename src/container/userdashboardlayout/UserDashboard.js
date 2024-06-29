import React, { useState } from "react";
import "./userdashboard.css";
import Index from "../Index";
import { Outlet } from "react-router-dom";
const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Index.Box className="dashboard-main">
        <Index.Box
          className={`dashboard-left-main ${
            open ? "active" : "user-sidebar-deactive"
          }`}
        >
          <Index.UserSidebar open={open} setOpen={setOpen} />
        </Index.Box>
        <Index.Box className="dashboard-right-main">
          <Index.UserHeader open={open} setOpen={setOpen} />
          <Index.Box className="dashboard-content-main">
            <Outlet />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default UserDashboard;
