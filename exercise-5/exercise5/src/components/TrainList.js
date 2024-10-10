import React, { useEffect, useState } from "react";
import Train from "./Train"; // Import your Train component

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/trains");
        const data = await response.json();
        setTrains(data); // Set trains data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching train data:", error);
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h1>Train List</h1>
      {trains.map((train) => (
        <Train key={train._id} {...train} /> // Render Train component for each train
      ))}
    </div>
  );
};

export default TrainList;
  