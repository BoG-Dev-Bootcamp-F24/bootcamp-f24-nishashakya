import React from 'react';

const Navbar = ({ stations }) => {
  return (
    <nav className="navbar">
      <h2>Select Your Starting Station</h2>
      <select>
        {stations.map((station, index) => (
          <option key={index} value={station}>{station}</option>
        ))}
      </select>
      <div className="buttons">
        <button>Arriving</button>
        <button>Scheduled</button>
        <button>Northbound</button>
        <button>Southbound</button>
        <button>Eastbound</button>
        <button>Westbound</button>
      </div>
    </nav>
  );
};

export default Navbar;