// import { server as hostUrl } from "../config";
import { deployedServer as hostUrl } from "../config";
import axios from "axios";

// User
export async function getLogInUser() {
  try {
    const token = localStorage.getItem("token");
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

export async function getUsers() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "success") {
      return response.data.data.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

export async function getUser(userId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // const tour = response;
    if (response.data.status === "success") {
      console.log(response);
      // return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

export async function createUser(userData) {
  const {
    email,
    name,
    role,
    // photo
  } = userData;

  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      console.log("Token not available");
      return null;
    }

    let response = await axios.post(hostUrl + `/api/v1/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        email,
        name,
        role,
        // photo,
      },
    });

    if (response.data.status === "success") {
      console.log(response.data.data.data);
      // return response.data.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}

// export async function updateUser({ name, email, role, userId }) {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("Token not available");
//       return null;
//     }

//     const response = await axios({
//       method: "PATCH",
//       url: `${hostUrl}/api/v1/users/${userId}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//       data: formData,
//     });

//     console.log(response.data.data.doc);
//     if (response.data.status === "success") {
//       return response.data.data.doc;
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error("Error updating user info");
//   }
// }

export async function updateUser({ name, email, role, userId }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    let response = await axios({
      method: "PATCH",
      url: hostUrl + `/api/v1/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        role,
      },
    });

    if (response.data.status === "success") {
      // console.log(response.data.data);
      return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deactivateUser(userId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    await axios({
      method: "DELETE",
      url: hostUrl + `/api/v1/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// Logged In User
export async function updateMe(formData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "PATCH",
      url: `${hostUrl}/api/v1/users/updateMe`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (response.data.status === "success") {
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating your info");
  }
}

export async function updatePassword({
  passwordCurrent,
  password,
  passwordConfirm,
}) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "PATCH",
      url: hostUrl + "/api/v1/users/updateMyPassword",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (response.data.status === "success") {
      console.log(response);
      return response.data.data.user;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating your password");
  }
}
