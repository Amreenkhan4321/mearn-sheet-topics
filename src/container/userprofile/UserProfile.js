import React from "react";
import Index from "../Index";
import "./userprofile.css";
import { styled } from "@mui/material/styles";

const UserProfile = () => {

    const Item = styled(Index.Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));
  return (
    <Index.Box className="dashboard-content">
      <Index.Box className="dashboard-content-main">
        {" "}
        <Index.Box className="profile-main">
          {" "}
          <Index.Box className="card-main profile-card-main">
            <Index.Box className="title-main mb-15 text-center">
              <Index.Typography
                variant="p"
                component="p"
                className="page-title"
              >
                Update Profile
              </Index.Typography>
            </Index.Box>
            <Index.Box className="profile-image text-center mb-20 user-profile-details">
              <img
                // src={PagesIndex.Png.usericon}
                className="profile-img mb-15"
              />

              <Index.Box className="flex-center">
                <Index.Box className="common-button grey-button change-profile user-edit-btn-details">
                  <Index.Button variant="contained" type="button" className="">
                    <img
                    //   src={PagesIndex.Svg.pencil}
                      className="edit-profile-user"
                    />
                  </Index.Button>
                  <input
                    type="file"
                    className="change-profile-input"
                    accept="image/*"
                    name="image"
                  />
                </Index.Box>
              </Index.Box>
            </Index.Box>
            <Index.Box className="profile-inner">
              <Index.Box className="">
                <Index.Grid
                  container
                  columnSpacing={{ xs: 3.75, sm: 3.75, md: 3.75 }}
                >
                  <Index.Grid item xs={12} sm={6} md={12} lg={6}>
                    <Item className="dashboard-item">
                      <Index.Box>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="change-input-label"
                        >
                          First Name
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border mb-15">
                          <Index.TextField
                            name="fname"
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder=""
                            variant="filled"
                            className="admin-input-design input-placeholder"
                          />
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={12} lg={6}>
                    <Item className="dashboard-item">
                      <Index.Box>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label"
                        >
                          Last Name
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border mb-15">
                          <Index.TextField
                            name="lname"
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder=""
                            variant="filled"
                            className="admin-input-design input-placeholder"
                          />
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={12} lg={6}>
                    <Item className="dashboard-item">
                      <Index.Box>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label"
                        >
                          User Name
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border mb-15">
                          <Index.TextField
                            name="userName"
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder=""
                            variant="filled"
                            className="admin-input-design input-placeholder"
                          />
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Grid>

                  <Index.Grid item xs={12} sm={6} md={12} lg={6}>
                    <Item className="dashboard-item">
                      <Index.Box>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label"
                        >
                          Email
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border mb-15">
                          <Index.TextField
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder=""
                            variant="filled"
                            className="admin-input-design input-placeholder"
                            name="email"
                          />
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Grid>
                  <Index.Grid item xs={12} sm={6} md={12} lg={6}>
                    <Item className="dashboard-item">
                      <Index.Box>
                        <Index.Typography
                          variant="label"
                          component="label"
                          className="input-label"
                        >
                          Mobile Number
                        </Index.Typography>
                        <Index.Box className="input-design-div with-border mb-15">
                          <Index.TextField
                            InputProps={{
                              inputProps: {
                                maxLength: 10,
                              },
                            }}
                            hiddenLabel
                            id="filled-hidden-label-normal"
                            placeholder=""
                            variant="filled"
                            className="admin-input-design input-placeholder"
                            name="mobileno"
                          />
                        </Index.Box>
                      </Index.Box>
                    </Item>
                  </Index.Grid>

                  <Index.Grid item xs={12}>
                    <Index.Box className="set-text-area mb-20">
                      <Index.Typography
                        variant="label"
                        component="label"
                        className="input-label"
                      >
                        Address
                      </Index.Typography>
                      <Index.Box className="set-textarea-box-top">
                        <Index.TextareaAutosize
                          className="set-textarea-box textarea-details-user"
                          aria-label="empty textarea"
                          placeholder=""
                          multiline
                          name="address"
                          type="text"
                        />
                      </Index.Box>
                    </Index.Box>
                  </Index.Grid>
                </Index.Grid>
              </Index.Box>
            </Index.Box>
            <Index.Box className="common-button blue-button change-password-btn update_priofile_btn">
              <Index.Button variant="contained" type="submit">
                Update Profile
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default UserProfile;
