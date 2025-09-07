import React, { useState } from 'react';
import './ManageTrackStyles.css';

function createData(trackID, location, usagePercentage, state){
  return { trackID, location, usagePercentage, state};
};

export function ManageTrack(){
  //demo data Track ID, occupancy, usage %, blocked/free state
    const [tracks, setTracks] = useState([
        createData('Track1', 'West Bengal', '65%', 'Free'),
        createData('Track2', 'Odisha',  '75%', 'Occupied'),
        createData('Track3', 'West Bengal.', '45%', 'Occupied'),
        createData('Track5', 'Jharkhand', '25%', 'Blocked'),
        createData('Track4', 'West Bengal', '35%', 'Free'),
      ]);
      
      const locations = ['West Bengal', 'Odisha', 'Jharkhand',];
      const trackState = ['Open', 'Block'];
    //filtering functions
    function filterByState(event){
        const filterState = event.target.value;
        // filtering on given status
        const filteredTracks = tracks.filter((track) => {
            return track.state === filterState;
        });
        
        const rest = tracks.filter((track) => {
            return track.state !== filterState;
        });
        
        //creating new List
        const newTrackList = [...filteredTracks , ...rest];
        setTracks(newTrackList);
    }

    function filterByLocation(event){
        const filterLocation = event.target.value;
        // filtering on given source
        const filteredTracks = tracks.filter((track) => {
            return track.location === filterLocation;
        });
        
        const rest = tracks.filter((track) => {
            return track.location !== filterLocation;
        });
        
        //creating new List
        const newTrackList = [...filteredTracks , ...rest];
        setTracks(newTrackList);
    }

    function changeTrackState(event, tid){
      const newTrackState = event.target.textContent;
      tracks.forEach((track) => {
            if(track.trackID === tid){
              if(newTrackState === 'Free'){
                track.state='Free';
              }
              else{
                track.state='Blocked';
              }
            }  
        });
      setTracks([...tracks]);
    }

  return (
    <div className='container'>
        <h1 className='track-status-heading'>Track Status Board</h1>
        <div className='filter-container'>
        <label>Filter By State:</label>
        <select className='filter-by-state' name='filterByState' onChange={(e) => filterByState(e)}>
            <option value=''>Filter By State</option>
            <option value="Free">Free</option>
            <option value="Occupied">Occupied</option>
            <option value="Blocked">Blocked</option>
        </select><br/>
        </div>
        <div className='filter-container'>
        <label>Filter By Location:</label>
        <select className='filter-by-location' name='filterByLocation' onChange={(e) => filterByLocation(e)}>
            <option value=''>Location</option>
            {locations.map((location) => <option value={location}>{location}</option>)}
        </select>
        </div>
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Track ID</th>
          <th>Location</th>
          <th>Usage%</th>
          <th>State</th>
          <th>Change Track State</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map(track => (
          <React.Fragment key={track.trackID}>
            <tr>
              <td>{track.trackID}</td>
              <td>{track.location}</td>
              <td>{track.usagePercentage}</td>
              <td>{track.state}</td>
              <td>
                <button onClick={(e) => changeTrackState(e,track.trackID)} style={{ cursor: 'pointer' }}>
                  {track.state==='Blocked' ? 'Free' : 'Block'}
                </button>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}
