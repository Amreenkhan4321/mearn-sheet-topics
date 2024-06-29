import React, { useState } from "react";
import "../userdashboardlayout/userdashboard.css";
import { Form, Formik } from "formik";
import { SignUpValidation } from "../../validation/Validation";
import Index from "../Index";
import dataService from "../../config/DataService";
import { Api } from "../../config/Api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const initialValues = {
    name: "",
    email: "",
    password: "",

    mobileNumber: "",
    age: "",
    gender: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values) => {
    try {
      let data = {
        name: values.name,
        email: values.email,
        password: values.password,
        mobile: values.mobileNumber,
      };
      const res = await dataService.post(Api.SIGNUP_USER, data);

      if (res.data.status === 201) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }

    // toast.success("Admin created successfully");
    // dispatch(setSignUpData(data));
    // navigate("/");
  };
  return (
    <Index.Box className="signup-main">
      <Index.Box className="admin-login-right-main">
        <Index.Box className="admin-login-form-main">
          <Index.Typography className="admin-login-right-text">
            Create your account
          </Index.Typography>

          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={SignUpValidation}
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
                <Index.TextField
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className="admin-login-field"
                  placeholder="Enter your name"
                ></Index.TextField>
                {errors?.name && touched.name && (
                  <p className="error-text">{errors?.name}</p>
                )}
                <Index.TextField
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className="admin-login-field"
                  placeholder="Enter your email"
                ></Index.TextField>
                {errors?.email && touched.email && (
                  <p className="error-text">{errors?.email}</p>
                )}
                <Index.TextField
                  name="mobileNumber"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="off"
                  className="admin-login-field"
                  placeholder="Enter your number"
                ></Index.TextField>
                {errors?.mobileNumber && touched.mobileNumber && (
                  <p className="error-text">{errors?.mobileNumber}</p>
                )}
                <Index.TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="admin-login-field"
                  autoComplete="off"
                  name="password"
                  aria-label="password"
                  type={showPassword ? "text" : "password"}
                  inputProps={{
                    className: "input_props",
                  }}
                  InputLabelProps={{ className: "add-formlabel" }}
                  FormHelperTextProps={{
                    className: "input_label_props",
                  }}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <Index.InputAdornment position="end">
                        <Index.IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <Index.Visibility />
                          ) : (
                            <Index.VisibilityOff />
                          )}
                        </Index.IconButton>
                      </Index.InputAdornment>
                    ),
                  }}
                />{" "}
                {errors?.password && touched.password && (
                  <p className="error-text">{errors?.password}</p>
                )}
                <Index.TextField
                  hiddenLabel
                  id="filled-hidden-label-normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter confirm password"
                  className="admin-login-field"
                  autoComplete="off"
                  name="confirmPassword"
                  aria-label="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  inputProps={{
                    className: "input_props",
                  }}
                  InputLabelProps={{ className: "add-formlabel" }}
                  FormHelperTextProps={{
                    className: "input_label_props",
                  }}
                  sx={{ mb: 3 }}
                  InputProps={{
                    endAdornment: (
                      <Index.InputAdornment position="end">
                        <Index.IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Index.Visibility />
                          ) : (
                            <Index.VisibilityOff />
                          )}
                        </Index.IconButton>
                      </Index.InputAdornment>
                    ),
                  }}
                />{" "}
                {errors?.confirmPassword && touched.confirmPassword && (
                  <p className="error-text">{errors?.confirmPassword}</p>
                )}
                <Index.Box className="admin-login-btn-main m-10">
                  {" "}
                  <Index.Button type="submit" className="admin-login-btn">
                    Register
                  </Index.Button>
                </Index.Box>
              </Form>
            )}
          </Formik>

          <Index.Typography className="admin-login-right-text-grey">
            Already Registered!
            <Link to="/login" className="admin-login-link-text">
              Log in
            </Link>
          </Index.Typography>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default Register;
