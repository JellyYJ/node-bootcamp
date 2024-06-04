import { server as hostUrl } from "../config";
// import { deployedServer as hostUrl } from "../config";
import axios from "axios";

// Tours
export async function getTours() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/tours");
    const toursData = response.data.data.data;
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

export async function getToursByDistance(latitude, longitude) {
  try {
    const response = await axios.get(
      hostUrl + `/api/v1/tours/distances/${latitude},${longitude}/unit/mi`
    );
    if (response.data.status === "success") {
      return response.data.data.data;
    }
  } catch (error) {
    console.error("Error fetching tours by distance:", error);
    return [];
  }
}

export async function createTour(tourData) {
  // console.log(tourData);
  const {
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    startDates,
    // imageCover,
  } = tourData;

  console.log(
    name,
    duration,
    maxGroupSize,
    difficulty,
    price,
    summary,
    startDates
    // imageCover
  );

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "POST",
      url: `${hostUrl}/api/v1/tours`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        duration,
        maxGroupSize,
        difficulty,
        price,
        summary,
        startDates,
        // imageCover,
      },
    });

    if (response.data.status === "success") {
      return response.data.data.data;
    } else {
      console.log("Response status is not success");
      return null;
    }
  } catch (err) {
    console.log("Error creating tour:", err);
    return null;
  }
}

export async function updateTour({ formData, tourId }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    const response = await axios({
      method: "PATCH",
      url: `${hostUrl}/api/v1/tours/${tourId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    if (response.data.status === "success") {
      console.log(response.data.data.doc);
      return response.data.data.doc;
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error updating your info");
  }
}

export async function deleteTour(tourId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not available");
      return null;
    }

    await axios({
      method: "DELETE",
      url: hostUrl + `/api/v1/tours/${tourId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
