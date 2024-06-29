import DashboardLayout from "../../components/dashboardlayout/DashboardLayout";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
const DashboardDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDate, setShowDate] = useState("");
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDateChange = (date) => {
    // Handle the date change here
    setSelectedDate(date);
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");
      setShowDate(date ? formattedDate : "");
    }
  };
  const handleDatePickerShow = () => {
    document.getElementById("date-picker-show").click();
  };

  return (
    <>
      <DashboardLayout />
      <Box className="main-div-datepicker">
        <Typography variant="label" component="label" className="input-label">
          Date picker
        </Typography>
        {/* <Box>
        {" "}
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          className="custom-datepicker" // Add a custom class
          style={{ border: "2px solid red" }} // Add inline styles
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy h:mm aa"
        />
      </Box> */}

        <Box className="calender-date-main">
          <Box className="calender-date-inner">
            <DatePicker
              autoComplete="off"
              id="date-picker-show"
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              // timeFormat="HH:mm"
              timeIntervals={1}
              dateFormat="dd/MM/yyyy h:mm aa"
              className="datepicker-content"
            />

            <CalendarMonthIcon
              onClick={handleDatePickerShow}
              className="icon-datepicker"
            />
          </Box>
        </Box>
        <Box className="text-datepicker">
          <Typography className="text">
            {showDate ? showDate : "No date available"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DashboardDatePicker;
