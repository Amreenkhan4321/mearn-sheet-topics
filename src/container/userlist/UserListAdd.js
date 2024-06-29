import React from "react";
import Index from "../Index";
import userprofile from "../../assets/images/user.png";
import { Form, Formik } from "formik";
import dataService from "../../config/DataService";
import { Api } from "../../config/Api";
import { toast } from "react-toastify";
import "../userdashboardlayout/userdashboard.css";
import { UpdateUserSchema } from "../../validation/Validation";
const UserListAdd = ({
  editOpen,
  handleEditClose,
  setEditOpen,
  editData,
  getAllUser,
  setEditData,
}) => {
  const initialValues = {
    name: editData?.name ? editData?.name : "",
    email: editData?.email ? editData?.email : "",
    password: editData?.password ? editData?.password : "",
    phone_number: editData?.mobile ? editData?.mobile : "",
    age: editData?.age ? editData?.age : "",
    gender: editData?.gender ? editData?.gender : "",
    image: editData?.profile ? editData?.profile : "",
  };

  const handleFormSubmit = async (values) => {
    console.log(values, 100);

    let data = {
      name: values.name,
      email: values.email,
      mobile: values.phone_number,
    };
    try {
      const res = await dataService.put(
        `${Api.UPDATE_USER_ADD}/${editData?._id}`,
        data
      );
      if (res?.data?.status == 200 || 201) {
        toast.success(res?.data?.message);
        setEditOpen(false);
        getAllUser();
        setEditData("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Index.Box className="add-model-main">
      <Index.Dialog className="dialog-box" open={editOpen}>
        <Index.Box className="add-header">
          <Index.Box>Update</Index.Box>
          <Index.IconButton onClick={() => handleEditClose()}>
            <Index.CloseIcon />
          </Index.IconButton>
        </Index.Box>
        <Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={UpdateUserSchema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            touched,
            setFieldValue,
          }) => (
            <Form className="add_form" onSubmit={handleSubmit}>
              {console.log(errors)}
              <Index.Box className="add-field-main">
                <Index.TextField
                  variant="standard"
                  name="name"
                  className="add-field"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  onBlur={handleBlur}
                />
                {errors?.name && touched.name && (
                  <p className="error-text">{errors?.name}</p>
                )}
              </Index.Box>

              <Index.Box className="add-field-main">
                <Index.TextField
                  variant="standard"
                  className="add-field"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  onBlur={handleBlur}
                />
                {errors?.email && touched.email && (
                  <p className="error-text">{errors?.email}</p>
                )}
              </Index.Box>

              <Index.Box className="add-field-main">
                <Index.TextField
                  variant="standard"
                  name="phone_number"
                  className="add-field"
                  type="number"
                  value={values.phone_number}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  onBlur={handleBlur}
                />
                {errors?.phone_number && touched.phone_number && (
                  <p className="error-text">{errors?.phone_number}</p>
                )}
              </Index.Box>

              <Index.Box className="add-btn-main">
                {" "}
                <Index.Button className="add-btn" type="submit">
                  Update
                </Index.Button>
              </Index.Box>
            </Form>
          )}
        </Formik>
      </Index.Dialog>
    </Index.Box>
  );
};

export default UserListAdd;
