import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/admin/action";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (isSubmitting) {
      // Validate email
      if (!formData.email) {
        setErrors({ email: "Email is required" });
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setErrors({ email: "Please enter valid email" });
      } else {
        setErrors({});
      }
      // Validate password
      if (!formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password is required",
        }));
      } else if (formData.password.length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors }));
      }
      setIsSubmitting(false);
    }
  }, [isSubmitting, formData.email, formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = {
      Email: formData.email,
      Password: formData.password,
    };
    // Simulate authentication by checking email and password
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "password"
    ) {
      const token = "your_mock_token";

      localStorage.setItem("token", token);

      dispatch(login(data));

      navigate("/dashboard");

      toast.success("🦄 Login Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
    // dispatch(login(data));
    // navigate("/dashboard");

    // toast.success("🦄 Login Successfully!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "dark",
    // });
  };
  return (
    <>
      <div className="main-div">
        <div className="left-div"></div>
        <div className="right-div">
          <Box className="main-box">
            <Box className="login-title">
              <Typography className="login-title-text">
                {" "}
                Welcome back !
              </Typography>
            </Box>
            <Box className="body-title" mt={1}>
              <Typography className="body-text">
                Please enter your credentials to sign in !
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Typography
                    variant="label"
                    component="label"
                    className="input-label"
                  >
                    User Name
                  </Typography>
                  <TextField
                    className="input-design"
                    fullWidth
                    placeholder="admin@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                {errors.email && <p className="error">{errors.email}</p>}

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
                    placeholder="enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {errors.password && <p className="error">{errors.password}</p>}

                <Grid item xs={12} sm={12} md={12}>
                  <Box component="div" className="lower-main-box" m={1}>
                    <Box className="remember-box">
                      {" "}
                      <Checkbox className="checkbox" defaultChecked />
                      <Typography className="remember-text">
                        Remember me
                      </Typography>
                    </Box>
                    <Box className="link-text">
                      <Link>Forgot Password</Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box className="submit-btn">
                    <Button fullWidth type="submit">
                      Sign In
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
};

export default SignIn;
