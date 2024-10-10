import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import TrainList from "../components/TrainList";

// Function to fetch station data from the backend
const fetchStationData = async () => await axios.get("/api/stations");

// Function to fetch train data from the backend
const fetchTrainData = async () => await axios.get("/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red"); // Default to red line
  const [stationData, setStationData] = useState([]); // To hold station data
  const [trainData, setTrainData] = useState([]); // To hold train data

  // UseEffect to fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await fetchStationData();
        const trains = await fetchTrainData();
        setStationData(stations.data); // Set station data
        setTrainData(trains.data);     // Set train data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <NavBar color={currColor} data={stationData} onChangeColor={setCurrColor} />
      <TrainList color={currColor} data={trainData} />
    </div>
  );
}