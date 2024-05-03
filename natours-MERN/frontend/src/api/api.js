import { server as hostUrl } from "../config";
import axios from "axios";

// Tours
export async function getToursData() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/tours/");
    // console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tours from server");
  }
}

// Auth
export async function login({ email, password }) {
  try {
    let response = await axios({
      method: "POST",
      url: hostUrl + "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    console.log(response);

    if (response.data.status === "success") {
      alert("Successfully Login");
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
}

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if ((res.data.status = "success")) alert("You are logged out");
  } catch (err) {
    console.log(err.response);
  }
};

// User
export async function getLogInUser() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/users/me");
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving current user from server");
  }
}

// export async function getLogInUser() {
//   try {
//     const token = localStorage.getItem("jwt"); // Assuming you're storing the token in localStorage after login
//     if (!token) {
//       throw new Error("No token found");
//     }

//     const response = await axios.get(hostUrl + "/api/v1/users/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response);
//     // return response.data.data.user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Error retrieving current user from server");
//   }
// }
