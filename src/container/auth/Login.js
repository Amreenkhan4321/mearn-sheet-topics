import React, { useState } from "react";
import "./login.css";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { LoginValidation } from "../../validation/Validation";
import dataService from "../../config/DataService";
import { Api } from "../../config/Api";
import { toast } from "react-toastify";
import Index from "../Index";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (values) => {
    let data = {
      email: values.email,
      password: values.password,
    };
    try {
      const res = await dataService.post(Api.SIGNIN_USER, data);
      console.log(res, 100);
      if (res?.data?.status === 200) {
        toast.success("User successfully logged");
        localStorage.setItem("token", res?.data?.data?.token);
        navigate("/userdashboard/userlist");
        //  dataService.defaults.headers.common.auth = res?.data?.data?.token;
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <>
      <Box className="main-box-login">
        <Box className="main-box">
          <Box className="login-title">
            <Typography className="login-title-text">
              {" "}
              Welcome back !
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={LoginValidation}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                {/* {console.log(errors)} */}

                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Email
                    </Typography>
                    <TextField
                      className="input-design"
                      fullWidth
                      placeholder="Enter your email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  {errors?.email && touched.email && (
                    <p className="error">{errors?.email}</p>
                  )}

                  <Grid item xs={12} sm={12} md={12}>
                    <Typography
                      variant="label"
                      component="label"
                      className="input-label"
                    >
                      Password
                    </Typography>
                    <TextField
                      className="input-design"
                      fullWidth
                      placeholder="Enter your password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  {errors?.password && touched.password && (
                    <p className="error">{errors?.password}</p>
                  )}

                  <Grid item xs={12} sm={12} md={12}>
                    <Box component="div" className="lower-main-box" m={1}>
                      {/* <Box className="remember-box">
                        {" "}
                        <Checkbox className="checkbox" defaultChecked />
                        <Typography className="remember-text">
                          Remember me
                        </Typography>
                      </Box> */}
                      {/* <Box className="link-text">
                        <Link to="/signup">Sign up</Link>
                      </Box> */}
                      <Index.Typography className="admin-login-right-text-grey">
                        Don't have an account?{" "}
                        <Link to="/register" className="admin-login-link-text">
                          Sign Up
                        </Link>
                      </Index.Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Box className="submit-btn">
                      <Button type="submit">Sign In</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default Login;
