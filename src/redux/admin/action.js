import type from "./type";
import CryptoJS from "crypto-js";

// Encrypt the password
// const encryptPassword = (password, secretKey) => {
//   const ciphertext = CryptoJS.AES.encrypt(password, secretKey).toString();
//   return ciphertext;
// };
const secretKey = "your-secret-key";

export const serialize = (data) => {
  const jsonData = JSON.stringify(data);
  const encryptedData = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
  return encryptedData;
};

export const deserialize = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData);
  return decryptedData;
};

export const login = (data) => {
  console.log(data?.Password);
  console.log("====================================");
  // Replace 'your-secret-key' with your actual secret key
  const secretKey = "your-secret-key";

  // Encrypt the password

  // const encryptedPassword = encryptPassword(data?.Password, secretKey);

  return {
    type: type.ADMIN_LOGIN_SUCCESS,
    payload: data,

    // payload: {
    //   Email: data?.Email,
    //   Password: encryptedPassword,
    // },
  };
};
