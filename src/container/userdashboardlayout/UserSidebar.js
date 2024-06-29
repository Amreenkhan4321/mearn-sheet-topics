import React from "react";
import Index from "../Index";

const UserSidebar = (props) => {
  return (
    <>
      <Index.Box className={`user-sidebar-main ${props.open ? "active" : ""}`}>
        <Index.Box className="user-sidebar-inner-main">
          <Index.Box className="user-sidebar-logo-main">
            <img className="user-sidebar-logo" src={Index.Png.crown} />
          </Index.Box>

          <Index.Box className="user-sidebar-list-main">
            <Index.List className="user-sidebar-list">
              <Index.ListItem className="user-sidebar-listitem">
                <Index.Link className="user-sidebar-link">
                  <img
                    // src={Index.Svg.editpage}

                    className="user-sidebar-icons"
                  />
                  Dashboard
                </Index.Link>
              </Index.ListItem>
              <Index.ListItem className="user-sidebar-listitem">
                <Index.Link className="user-sidebar-link">
                  <img
                    // src={Index.Svg.editpage}

                    className="user-sidebar-icons"
                  />
                  Userlist
                </Index.Link>
              </Index.ListItem>
            </Index.List>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default UserSidebar;
