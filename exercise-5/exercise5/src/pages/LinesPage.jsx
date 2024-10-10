import React, { useEffect, useState } from 'react';
import TrainList from '../components/TrainList';
import Navbar from '../components/Navbar';

const LinesPage = ({ line }) => {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/stations");
                const data = await response.json();
                const lineStations = data.find(station => station.line === line);
                setStations(lineStations ? lineStations.stations : []);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };

        fetchStations();
    }, [line]);

    return (
        <div>
            <Navbar stations={stations} />
            <TrainList line={line} />
        </div>
    );
};

export default LinesPage;