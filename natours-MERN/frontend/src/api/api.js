import { server as hostUrl } from "../config";
import axios from "axios";

export async function getToursData() {
  try {
    const response = await axios.get(hostUrl + "/api/v1/tours/");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Error retrieving tours from server");
  }
}
