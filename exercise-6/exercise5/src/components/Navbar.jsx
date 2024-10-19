import React, { useState } from "react";

const Navbar = ({ stations, selectedLine, onStationSelect, activeFilters, toggleFilter }) => {
  const [currentLine, setCurrentLine] = useState(null);

  const filters = {
    gold: ["Arriving", "Scheduled", "Northbound", "Southbound"],
    green: ["Arriving", "Scheduled", "Eastbound", "Westbound"],
    red: ["Arriving", "Scheduled", "Northbound", "Southbound"],
    blue: ["Arriving", "Scheduled", "Eastbound", "Westbound"],
  };

  const handleLineClick = (line) => {
    setCurrentLine(line);
  };

  const handleStationClick = (station) => {
    onStationSelect(station);
  };

  return (
    <nav>

      {selectedLine && (
        <div>
          {filters[selectedLine]?.map((filter) => ( 
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={activeFilters.includes(filter) ? "active-filter" : ""}
              style={{
                backgroundColor: 'transparent', 
                color: 'white',
                border: 'none',
                padding: '10px',
                cursor: 'pointer',
                margin: '5px 0',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div>
      <h3 style={{ color: 'rgba(222, 222, 222, 0.924)' }}>Select your starting station</h3>


        <div>
          {stations.length > 0 ? (
            stations.map((station, index) => (
              <button
                key={index}
                onClick={() => handleStationClick(station)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  textAlign: 'left',
                  padding: '10px',
                  cursor: 'pointer',
                  margin: '5px 0',
                }}
              >
                {station}
              </button>
            ))
          ) : (
            <p>No Stations Available</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;