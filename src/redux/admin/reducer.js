import type from "./type";

const initialState = {
  isAdminLogin: false,
  adminDetails: {},
};
const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        // adminDetails: {
        //   email: action.payload.Email,
        //   password: action.payload.Password, // Store the encrypted password
        // },
        adminDetails: action.payload,
        isAdminLogin: true,
      };

    default: {
      return state;
    }
  }
};

export default AdminReducer;
