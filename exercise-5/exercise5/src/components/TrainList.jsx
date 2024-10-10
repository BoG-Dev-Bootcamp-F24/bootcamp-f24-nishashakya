import React, { useEffect, useState } from "react";
import Train from "./Train";

const TrainList = ({ line }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/trains");
        const data = await response.json();
        
        const filteredTrains = data.filter(train => train.LINE === line);
        setTrains(filteredTrains);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching train data:", error);
        setLoading(false);
      }
    };

    fetchTrains();
  }, [line]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train List for {line} Line</h1>
      {trains.length === 0 ? (
        <p>No trains available for this line.</p>
      ) : (
        trains.map((train) => (
          <Train key={train.TRAIN_ID} {...train} />
        ))
      )}
    </div>
  );
};

export default TrainList;