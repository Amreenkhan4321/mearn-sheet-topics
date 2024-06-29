import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Formik } from "formik";
import { Box, Button, Typography } from "@mui/material";
import dataService from "../config/DataService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DashboardLayout from "../components/dashboardlayout/DashboardLayout";

const CkEditorAboutUs = () => {
  // Define initial form values
  let initialValues = {
    title: "",
    description: "",
    isSubmit: false,
  };

  // State to hold CKEditor data and formatted text
  const [getCmsData, setGetCmsData] = useState("");
  const [formattedText, setFormattedText] = useState("");

  // React Router hook to navigate between pages
  const navigate = useNavigate();

  // Effect to convert CKEditor HTML data to normal form when getCmsData changes
  useEffect(() => {
    const convertToNormalForm = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.body.textContent || "";
    };

    setFormattedText(convertToNormalForm(getCmsData));
  }, [getCmsData]);

  // Form submission handler
  const handleFormSubmit = (values, { setSubmitting }) => {
    // Simulate a delay, replace with actual API call
    setTimeout(() => {
      setGetCmsData(values.description);
      setSubmitting(false);
    }, 500);
  };

  // CKEditor image upload adapter function
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("ckImage", file);
            dataService
              .post("admin/ckImageEditor", body)
              .then((res) => {
                resolve({
                  default: `http://35.177.56.74:3027/uploads/${res.data.fileName}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  // CKEditor upload plugin function
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      {/* Dashboard layout component */}
      <DashboardLayout />

      {/* Main container for CKEditor and formatted content */}
      <Box className="cms-main">
        {/* Typography component */}
        <Typography m={5} className="admin-page-title" variant="h5">
          CK Editor
        </Typography>

        {/* Formik form component */}
        <Formik
          enableReinitialize
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* Box container for form */}
              <Box m={5} mt={5} className="barge-common-box">
                {/* Main CMS box */}
                <Box className="cms">
                  {/* Grid row for CMS page */}
                  <Box className="grid-row cms-page-row">
                    {/* Main grid container */}
                    <Box className="grid-main">
                      {/* Grid column */}
                      <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
                      >
                        <Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 10",
                          }}
                          className="grid-column"
                        >
                          {/* Input box for CKEditor */}
                          <Box className="input-box" mt={4}>
                            <Typography
                              variant="label"
                              component="label"
                              className="input-label"
                            >
                              Description
                            </Typography>

                            {/* CKEditor component */}
                            <Box className="form-group">
                              <CKEditor
                                className="ck-editor"
                                editor={ClassicEditor}
                                data={values?.description}
                                name="description"
                                onChange={(event, editor) => {
                                  const data = editor?.getData();
                                  setFieldValue("description", data);
                                }}
                                config={{
                                  extraPlugins: [uploadPlugin],
                                  mediaEmbed: { previewsInData: true },
                                }}
                              />
                            </Box>

                            {/* Error message for description field */}
                            {errors?.description && touched?.description && (
                              <p className="error-text">
                                {errors?.description}
                              </p>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Save button */}
                  <Box
                    mt={5}
                    className="save-btn-main border-btn-main res-set-search"
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      className="save-user-btn border-btn"
                      type="submit"
                      disabled={values.isSubmit}
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          )}
        </Formik>

        {/* Main show div container for formatted content */}
        <div className="main-show-div">
          {/* Div for formatted content heading */}
          <div>
            <h2>Formatted Content</h2>
          </div>

          {/* Div for CKEditor output */}
          <div
            className="ck-editor-output"
            dangerouslySetInnerHTML={{ __html: getCmsData }}
            style={{ maxWidth: "100%" }}
          />
        </div>
      </Box>
    </>
  );
};

export default CkEditorAboutUs;
