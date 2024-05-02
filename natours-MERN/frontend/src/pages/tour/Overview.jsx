import { useEffect, useState } from "react";
import { getToursData } from "../../api/api";

function Overview() {
  const [toursData, setTourData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getToursData();
        setTourData(response?.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {toursData.map((tour) => (
        <div key={tour._id}>
          <h2>{tour.name}</h2>
          <p>Price: {tour.price}</p>
          <p>Ratings Average: {tour.ratingsAverage}</p>
          <p>Ratings Quantity: {tour.ratingsQuantity}</p>
          {/* Render other tour information */}
        </div>
      ))}
    </div>
  );
}

export default Overview;
