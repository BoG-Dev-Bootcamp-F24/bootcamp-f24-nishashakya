import React, { useEffect, useState } from "react";

const TrainList = ({ line, filters, selectedStation }) => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  const getLineColor = (line) => {
    switch (line) {
      case 'gold':
        return 'gold';
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      case 'green':
        return 'green';
      default:
        return 'gray'; 
    }
  };

  useEffect(() => {
    const fetchTrains = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await fetch("http://localhost:5001/api/trains");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log("Fetched Trains:", data); 

        if (data.length > 0) {
          const filteredTrains = data[0]?.RailArrivals.filter(train => {
            const matchesLine = line
              ? train.LINE.trim().toUpperCase() === line.trim().toUpperCase()
              : true;

            const matchesStation = selectedStation
              ? train.HEAD_SIGN.trim().toUpperCase() === selectedStation.trim().toUpperCase()
              : true;

            const matchesFilter = filters.length > 0
              ? filters.some(filter => {
                  if (filter === "Arriving" && train.WAITING_TIME === "Arriving") return true;
                  if (filter === "Scheduled" && train.WAITING_TIME !== "Arriving") return true;
                  if (filter === "Northbound" && train.DIRECTION === "N") return true;
                  if (filter === "Southbound" && train.DIRECTION === "S") return true;
                  if (filter === "Westbound" && train.DIRECTION === "W") return true;
                  if (filter === "Eastbound" && train.DIRECTION === "E") return true;
                  return false;
                })
              : true;

            return matchesLine && matchesStation && matchesFilter;
          }) || [];

          console.log("Filtered Trains:", filteredTrains);
          setTrains(filteredTrains);
        } else {
          setTrains([]);
        }
      } catch (error) {
        console.error("Error fetching train data:", error);
        setError("Failed to fetch train data.");
      } finally {
        setLoading(false);
      }
    };

    if (line) {
      fetchTrains();
    } else {
      setTrains([]);
    }
  }, [line, selectedStation, filters]);

  if (loading) {
    return <div>Loading trains...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {trains.length === 0 ? (
        <p>No Current Trains Match Filters</p>
      ) : (
        <div>
          {trains.map((train) => (
            <div key={train.TRAIN_ID}>
              <p>
                {train.STATION} &rarr; {train.DESTINATION}
              </p>
              <p>
                Next Arrival: {new Date(train.NEXT_ARR).toLocaleTimeString()} (Wait: {train.WAITING_TIME})
              </p>

              <div
                style={{
                  backgroundColor: getLineColor(line),
                  color: 'white', 
                  padding: '1px 5px', 
                  borderRadius: '5px', 
                  display: 'inline-block', 
                  fontWeight: 'bold', 
                  textAlign: 'center', 
                  cursor: 'default',
                }}
              >
                {line.toUpperCase()}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainList;


