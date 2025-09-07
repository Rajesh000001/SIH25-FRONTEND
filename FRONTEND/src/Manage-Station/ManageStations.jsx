import React, { useState } from 'react';
import './ManageStationStyles.css';

function createData(platformNo, status, train, trainPNR){
  return {platformNo, status, train, trainPNR};
};

export function ManageStations(){
  //demo data 
    const [stations, setStations] = useState({
        Howrah:[
        createData('Platform 1', 'Free', 'Vande Bharat', 220321),
        createData('Platform 2', 'Expecting Arrival', 'Vande Bharat', 210574),
        createData('Platform 3', 'Occupied', 'Coal Field Express', 315810),
        createData('Platform 4', 'Occupied', 'Vande Bharat', 215482),
        createData('Platform 6', 'Free', 'Rajdhani Express', 121511),
        ],
        Dhanbad:[
        createData('Platform 1', 'Free', 'Coal Field Express', 245421),
        createData('Platform 3', 'Expecting Arrival', 'Rajdhani Express', 321511),
        createData('Platform 9', 'Occupied', 'Vande Bharat', 267895),
        createData('Platform 8', 'Occupied', 'Rajdhani Express', 215579),
        ],
    });
    const statuses = ["Free", "Occupied", "Unavailable", "Expecting Arrival"];
    const [platforms, setPlatforms] = useState([]);
      
    // functions
    function filterByStatus(event){
        const filterStatus = event.target.value;
        // filtering on given status
        const filteredPlatforms = platforms.filter((platform) => {
            return platform.status === filterStatus;
        });
        
        const rest = platforms.filter((platform) => {
            return platform.status !== filterStatus;
        });
        
        //creating new List
        const newPlatformList = [...filteredPlatforms , ...rest];
        setPlatforms(newPlatformList);
    }

    function handleStationChange(e){
        const stationName = e.target.value;
        for (const [key,value] of Object.entries(stations)){
            if(key === stationName){
                setPlatforms([...value]);
                break;
            }
        }
    }

    function changePlatformAllocation(event, tid){
      const newTrackState = event.target.textContent;
      stations.forEach((track) => {
            if(track.platformNo === tid){
              if(newTrackState === 'Free'){
                track.status='Free';
              }
              else{
                track.status='Blocked';
              }
            }  
        });
      setTracks([...tracks]);
    }

  return (
    <div className='container'>
        <h1 className='station-status-heading'>Station Status Board</h1>
        <div className='filter-container'>
        <label>Change Station:</label>
        <select className='change-station' name='changeStation' onChange={(e) => handleStationChange(e)}>
            <option value=''>Station</option>
            {Object.keys(stations).map((station) => <option value={station}>{station}</option>)}
        </select><br/>
        </div>
        <div className='filter-container'>
        <label>Filter By Status:</label>
        <select className='filter-by-status' name='filterByStatus' onChange={(e) => filterByStatus(e)}>
            <option value=''>Status</option>
            {statuses.map((status) => <option value={status}>{status}</option>)}
        </select>
        </div>
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
            {/* (platformNo, status, train, trainPNR */}
          <th>Platform No.</th>
          <th>Platform Status</th>
          <th>Train Name</th>
          <th>Train PNR</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {platforms.map(platform => (
          <React.Fragment key={platform.platformNo}>
            <tr>
              <td>{platform.platformNo}</td>
              <td>{platform.status}</td>
              <td>{platform.status === "Free" ? "-" : platform.train}</td>
              <td>{platform.status === "Free" ? "-" : platform.trainPNR}</td>
              <td>
                <button></button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}

