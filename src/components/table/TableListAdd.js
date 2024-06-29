import React from "react";
import { useField } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Index from "../../../Index";

export const CkEditorAboutUs = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event, editor) => {
    const data = editor.getData();
    helpers.setValue(data);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("ckImage", file);
            Index.dataService
              .post("admin/ckImageEditor", body)
              .then((res) => {
                resolve({
                  default: `http://35.177.56.74:3027/uploads/${res?.data?.fileName}`,
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
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <Index.Box>
      <label htmlFor={name}>{label}</label>
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
          mediaEmbed: { previewsInData: true },
        }}
        editor={ClassicEditor}
        data={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error && (
        <Index.Box className="ckeditor-error">{meta.error}</Index.Box>
      )}
    </Index.Box>
  );
};
