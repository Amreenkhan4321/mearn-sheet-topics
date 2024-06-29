import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Svg from "../../assets/Svg";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Sidebar = ({ open, setOpen }) => {
  const [opens, setOpens] = useState(false);

  const handleClickCms = () => {
    setOpens(!opens);
  };
  return (
    <>
      <Box className={`sidebar-main ${!open ? "active" : "sidebar-none"}`}>
        <Box className="sidebar-logo">
          <Typography className="sidebar-main-text">Dashboard</Typography>
        </Box>
        <Box className="sidebar-links">
          <Box className="sidebar-ul">
            <Box className="sidebar-li">
              <Link to="/dataTable">
                {" "}
                <img src={Svg.sidebar1} /> User List Page
              </Link>
            </Box>
            <ListItem className="">
              <Box className="">
                <Box className="cms-text" onClick={handleClickCms}>
                  <img
                    src={Svg.sidebar5}
                    alt="sidebar icon"
                    className="cms-logo"
                  />
                  Edit page
                  {opens ? (
                    <ExpandMore className="expandmore-icon" />
                  ) : (
                    <ExpandLess className="expandless-icon" />
                  )}
                </Box>
                <Box className="">
                  <Collapse
                    in={opens}
                    timeout="auto"
                    unmountOnExit
                    className=""
                  >
                    <List component="div" disablePadding className="">
                      <ListItem className="cms-listitem">
                        <Link to="#" className="">
                          xyz
                        </Link>
                      </ListItem>
                      <ListItem className="cms-listitem">
                        <Link to="#" className=" ">
                          xyz
                        </Link>
                      </ListItem>
                    </List>
                  </Collapse>
                </Box>
              </Box>
            </ListItem>
            <Box className="sidebar-li">
              <Link to="/datepicker">
                {" "}
                <img src={Svg.sidebar1} /> Date Picker
              </Link>
            </Box>

            <Box className="sidebar-li">
              <Link to="/cms">
                {" "}
                <img src={Svg.sidebar1} />
                CMS
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
