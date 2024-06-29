import React from "react";
import Index from "../../container/Index";

const DeleteModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };
  return (
    <>
      {" "}
      <Index.Modal
        open={props.deleteOpen}
        onClose={props.handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-delete modal"
      >
        <Index.Box sx={style} className="delete-modal-inner-main modal-inner">
          <Index.Typography
            className="delete-modal-para common-para"
            component="p"
          >
            Are you sure? Do you really want to delete this record ?
          </Index.Typography>
          <Index.Box className="delete-modal-btn-flex">
            <Index.Button
              className="modal-cancel-btn modal-btn"
              onClick={props.handleDeleteClose}
            >
              Cancel
            </Index.Button>
            <Index.Button
              className="modal-delete-btn modal-btn"
              onClick={props.handleDeleteRecord}
            >
              Delete
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default DeleteModal;
