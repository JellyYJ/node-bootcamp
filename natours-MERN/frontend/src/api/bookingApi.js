// import { server as hostUrl } from "../config";
import { deployedServer as hostUrl } from "../config";

import axios from "axios";

// Bookings and reviews
export async function getMyBookings() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios.get(hostUrl + `/api/v1/users/my-tours`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status === "success") {
      // console.log(response);
      return response.data.data.tours;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving the user from server");
  }
}
