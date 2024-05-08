import { server as hostUrl } from "../config";
import axios from "axios";

// Tours
export async function getToursData() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/tours");
    const toursData = response.data.data.data;
    // console.log(toursData);
    // console.log("api", response.data); ORIGINAL VERSION
    return toursData;
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tours from server");
  }
}

export async function getTour(tourId) {
  try {
    const response = await axios.get(hostUrl + `/api/v1/tours/${tourId}`);
    // const tour = response;
    if (response.data.status === "success") {
      // console.log(response.data);
      return response.data.data.doc;
    }
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
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    });
    // const data = await response.json();
    // console.log("settoken:", response.data.token);
    localStorage.setItem("token", response.data.token);

    if (response.data.status === "success") {
      alert("Successfully Login");
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No current logged in user");
      return null;
    }

    const response = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      alert("You are logged out");
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.log(err.response);
  }
}

// User
// export async function getLogInUser() {
//   try {
//     const response = await axios.get(hostUrl + "/api/v1/users/me");
//     console.log("getLoginUser");
//     return response;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Error retrieving current user from server");
//   }
// }

export async function getLogInUser() {
  try {
    const token = localStorage.getItem("token");
    // console.log("getToken", token);
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + "/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.data.doc;

    return userData;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
