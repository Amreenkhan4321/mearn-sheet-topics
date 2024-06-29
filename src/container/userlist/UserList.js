import React, { useEffect, useState } from "react";
import Index from "../Index";
import "../userdashboardlayout/userdashboard.css";
import dataService from "../../config/DataService";
import { Api } from "../../config/Api";
import DeleteModal from "../../components/common/DeleteModel";
import { toast } from "react-toastify";
import UserListAdd from "./UserListAdd";
import Switch from "@mui/material/Switch";

const UserList = () => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [data, setData] = useState([]);
  const [deleteID, setDeleteId] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter(
      (item) =>
        item?.name
          ?.toString()
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        item?.email
          ?.toString()
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        item?.mobile
          ?.toString()
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        item?.age
          ?.toString()
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        item?.gender
          ?.toString()
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase())
    );
    setFilteredData(filtered);

    setPage(0);
  }, [searchQuery, data]);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredData?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const deleteData = async () => {
    try {
      const res = await dataService.delete(`${Api.DELETE}/${deleteID}`);

      if (res?.data?.status == 200 || 201) {
        getAllUser();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleDeleteRecord = () => {
    deleteData();
    // dispatch(getAllUser());

    setDeleteOpen(false);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const getAllUser = async () => {
    const res = await dataService.get(Api.GETALL_USER);

    setData(res?.data?.data);
  };
  console.log(data, 1000);
  useEffect(() => {
    getAllUser();
  }, []);

  const handleEditOpen = (data) => {
    setEditData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    // setEditData("");
  };

  const handleChangeSwitch = async (id) => {
    try {
      const res = await dataService.post(Api.USER_STATUS_UPDATE, { id: id });

      if (res?.data?.status == 200 || 201) {
        getAllUser();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <Index.Box className="dashboard-content">
      <Index.Box className="user-list-flex">
        <Index.Typography
          className="admin-page-title user-list-page-title"
          component="h2"
          variant="h2"
        >
          User List
        </Index.Typography>
        <Index.Box className="userlist-btn-flex">
          <Index.Box></Index.Box>

          <Index.Box className="flex-all user-list-inner-flex">
            {/* <Index.Box className="adduser-btn-main btn-main-primary">
              <Index.Button
                className="adduser-btn btn-primary"
                // onClick={() => navigate("/admin/game-list/add")}
              >
                Add User
              </Index.Button>
            </Index.Box> */}
            <Index.Box className="main-box-search">
              {" "}
              <Index.TextField
                autoComplete="off"
                label="Search"
                variant="standard"
                className="search-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Index.IconButton onClick={() => setPage(0)}>
                      <Index.SearchIcon />
                    </Index.IconButton>
                  ),
                }}
              />
            </Index.Box>{" "}
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="admin-dashboard-list-row">
        <Index.Box sx={{ width: 1 }} className="grid-main">
          <Index.Box
            display="grid"
            className="display-row"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
          >
            <Index.Box
              gridColumn={{
                xs: "span 12",
                sm: "span 12",
                md: "span 12",
                lg: "span 12",
              }}
              className="grid-column"
            >
              <Index.Box className="admin-dash-box">
                <Index.Box className="userlist-table-main page-table-main gamewisebet-table">
                  <Index.TableContainer
                    component={Index.Paper}
                    className="table-container"
                  >
                    <Index.Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      className="table"
                    >
                      <Index.TableHead className="table-head">
                        <Index.TableRow className="table-row">
                          <Index.TableCell
                            component="th"
                            variant="th"
                            className="table-th"
                          >
                            Name
                          </Index.TableCell>
                          <Index.TableCell
                            component="th"
                            variant="th"
                            className="table-th"
                          >
                            Mobile
                          </Index.TableCell>
                          <Index.TableCell
                            component="th"
                            variant="th"
                            className="table-th"
                            align="center"
                          >
                            Email
                          </Index.TableCell>

                          <Index.TableCell
                            component="th"
                            variant="th"
                            className="table-th"
                            align="center"
                          >
                            Status
                          </Index.TableCell>

                          <Index.TableCell
                            component="th"
                            variant="th"
                            className="table-th"
                            align="right"
                          >
                            Action
                          </Index.TableCell>
                        </Index.TableRow>
                      </Index.TableHead>
                      <Index.TableBody className="table-body">
                        {paginatedData?.length > 0 ? (
                          paginatedData?.map((item) => (
                            <Index.TableRow
                              key={item.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <Index.TableCell
                                component="td"
                                variant="td"
                                scope="row"
                                className="table-td"
                                align="justify"
                              >
                                {item?.name}
                              </Index.TableCell>
                              <Index.TableCell
                                component="td"
                                variant="td"
                                scope="row"
                                className="table-td"
                                align="justify"
                              >
                                {item?.mobile}
                              </Index.TableCell>
                              <Index.TableCell
                                component="td"
                                variant="td"
                                scope="row"
                                className="table-td"
                                align="center"
                              >
                                {item?.email}
                              </Index.TableCell>
                              <Index.TableCell
                                component="td"
                                variant="td"
                                scope="row"
                                className="table-td"
                                align="center"
                              >
                                <Index.Switch
                                  checked={item?.isActive}
                                  onChange={() => handleChangeSwitch(item._id)}
                                />
                              </Index.TableCell>

                              <Index.TableCell
                                component="td"
                                variant="td"
                                className="table-td"
                              >
                                <Index.Box className="userdata-btn-flex align-items">
                                  <Index.Button
                                    onClick={() => handleEditOpen(item)}
                                  >
                                    <img src={Index.Svg.editicon}></img>
                                  </Index.Button>
                                  <Index.Button
                                    onClick={() => handleDeleteOpen(item._id)}
                                  >
                                    <img src={Index.Svg.deleteicon}></img>
                                  </Index.Button>
                                </Index.Box>
                              </Index.TableCell>
                            </Index.TableRow>
                          ))
                        ) : (
                          <Index.TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              No Record Found
                            </Index.TableCell>
                          </Index.TableRow>
                        )}
                      </Index.TableBody>
                    </Index.Table>
                    <hr />
                    <Index.Box className="pagination-font-main" mt={2}>
                      {" "}
                      <Index.TablePagination
                        className="pagination-font"
                        component="div"
                        count={filteredData?.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Index.Box>
                  </Index.TableContainer>

                  <DeleteModal
                    deleteOpen={deleteOpen}
                    handleDeleteRecord={handleDeleteRecord}
                    handleDeleteClose={handleDeleteClose}
                  />
                  <UserListAdd
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    editData={editData}
                    handleEditClose={handleEditClose}
                    getAllUser={getAllUser}
                    setEditData={setEditData}
                  />
                </Index.Box>
              </Index.Box>{" "}
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default UserList;
