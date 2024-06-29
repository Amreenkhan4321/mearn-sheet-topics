import React, { useState } from "react";
import DashboardLayout from "../dashboardlayout/DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const TableList = () => {
  const initialRows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const [rows, setRows] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    lastName: "",
    firstName: "",
    age: "",
  });

  console.log(formData?.row, "row after click edit");
  const openDeleteModel = (row) => {
    setOpenDelete(true);
    setId(row);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      lastName: "New Last Name",
      firstName: "New First Name",
      age: 25,
    };
    setRows([...rows, newRow]);
  };

  // Function to update the selected row
  const updateRow = () => {
    // if (selectedRow) {
    //   const updatedRows = rows.map((row) =>
    //     row.id === selectedRow.id ? selectedRow : row
    //   );
    //   setRows(updatedRows);
    //   setSelectedRow(null);
    // }
    // Implement your update logic here
    const updatedRows = rows.map((row) =>
      row.id === formData.id ? formData : row
    );
    console.log(formData, "updatedRows");
    setRows(updatedRows);
    setOpen(false);
  };

  // Function to delete the selected row
  const deleteRow = () => {
    if (id) {
      const updatedRows = rows.filter((row) => row.id !== id);
      setRows(updatedRows);
      setSelectedRow(null);
      setOpenDelete(false);
      toast("🦄 Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // const handleDelete = (rows) => {
  //   // Implement your delete logic here
  //   // You can confirm the deletion and then remove the row
  //   // setRows(rows.filter((r) => r.id !== row.id));

  //   // setSelectedRow(null);
  // };

  const openEditModel = (row) => {
    setOpen(true);
    console.log(row, "edit data row ");
    setFormData(row);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            openEditModel(params);
          }}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <IconButton
          // onClick={() => {
          //   handleDelete(params.id);
          // }}
          onClick={() => openDeleteModel(params.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout />
      <div className="main-table">
        <Box className="btn-main">
          <Button
            className="btn"
            onClick={() => {
              openEditModel();
            }}
            // onClick={addRow}
          >
            Add data
          </Button>
        </Box>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            onRowSelected={(row) => setSelectedRow(row.data)}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
        <div className="delete-main-box">
          {/* <Button variant="outlined" onClick={handleClickOpen}>
            Delete
          </Button> */}
          <Dialog
            open={openDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteRow} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent className="dialogbox">
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="First name"
                value={formData?.row?.firstName ? formData?.row?.firstName : ""}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Last name"
                value={formData?.row?.lastName ? formData?.row?.lastName : ""}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                type="emtextail"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Age"
                type="number"
                value={formData?.row?.age ? formData?.row?.age : ""}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={updateRow}>Update</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default TableList;
