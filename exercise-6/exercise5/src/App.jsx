import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TrainList from "./components/TrainList";
import './App.css'; 

const App = () => {
    const [selectedLine, setSelectedLine] = useState(() => {
        return localStorage.getItem('selectedLine') || null;
    });
    const [selectedStation, setSelectedStation] = useState(""); 
    const [activeFilters, setActiveFilters] = useState([]);
    const [stations, setStations] = useState([]);
    const [allStations, setAllStations] = useState({}); 

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await fetch("http://localhost:5001/api/stations");
                const data = await response.json();
                const stationData = data[0]; 
                setAllStations(stationData);
                setStations(stationData[selectedLine] || []); 
            } catch (error) {
                console.error("Error fetching station data:", error);
            }
        };

        fetchStations();
    }, [selectedLine]); 

    const handleLineClick = (line) => {
        setSelectedLine(line);
        localStorage.setItem('selectedLine', line);
        setActiveFilters([]);
        setSelectedStation(""); 
    };

    const handleStationSelect = (station) => {
        setSelectedStation(station);
    };

    const toggleFilter = (filter) => {
        setActiveFilters((prevFilters) =>
            prevFilters.includes(filter)
                ? prevFilters.filter((f) => f !== filter)
                : [...prevFilters, filter]
        );
    };

    const getLineColor = () => {
        switch (selectedLine) {
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

    return (
        <div className="app-container">

            <div className="line-buttons-container">
                {["gold", "red", "blue", "green"].map((line) => (
                    <button
                        key={line}
                        onClick={() => handleLineClick(line)}
                        style={{
                            backgroundColor: line,
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            margin: '0 5px',
                            cursor: 'pointer',
                        }}
                    >
                        {line.toUpperCase()}
                    </button>
                ))}
            </div>


            <header className="header" style={{ backgroundColor: 'white', color: 'black' }}>
                {selectedLine ? selectedLine.toUpperCase() : 'SELECT A LINE'}
            </header>
            <hr className="header-divider"/>

            <div className="content-container"> 
                <div className="navbar-container">
                    <Navbar
                        stations={stations}
                        selectedLine={selectedLine}
                        onLineClick={handleLineClick}
                        onStationSelect={handleStationSelect}
                        activeFilters={activeFilters}
                        toggleFilter={toggleFilter}
                    />
                </div>

                <div className="trainlist-container">
                    <TrainList line={selectedLine} selectedStation={selectedStation} filters={activeFilters} />
                </div>
            </div>
        </div>
    );
};

export default App;