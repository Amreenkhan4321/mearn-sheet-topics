import React, { useState } from "react";
import Sidebar from "../../pages/sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import Svg from "../../assets/Svg";
import usericon from "../../assets/images/user.png";
import { useSelector } from "react-redux";
import Dashboard from "../Dashboard/Dashboard";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const { adminDetails } = useSelector((state) => state.AdminReducer);

  return (
    <>
      <div className="main-dashboard">
        <Sidebar setOpen={setOpen} open={open} />
        <div className="right-dashboard-content">
          <header>
            <Box className={`main-header ${!open ? "" : "pl-none"}`}>
              <Box className="collapse-btn" onClick={() => setOpen((e) => !e)}>
                <img src={Svg.collapse} />
              </Box>
              <Box className="head-right">
                <img src={Svg.search} className="search-icon" />
                <img src={Svg.bell} className="bell-icon" />
              </Box>
              <Box className="admin-header-right">
                {" "}
                <Box className="head-right">
                  <img src={usericon} className="headprofile" />
                  <Box className="header-user-detail">
                    <Typography variant="p" className="head-user-title">
                      {adminDetails?.Email
                        ? adminDetails?.Email
                        : "admin@gmail.com"}
                    </Typography>
                    <Typography variant="p" className="head-user-mail">
                      {adminDetails?.Password
                        ? adminDetails?.Password
                        : "Admin@123"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </header>
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
