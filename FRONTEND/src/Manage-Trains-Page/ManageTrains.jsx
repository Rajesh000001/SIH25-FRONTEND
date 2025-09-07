import React, { useState } from 'react';
import './ManageTrainStyles.css';
function createData(trainID, source, destination, status, ETA, speed, currentStation){
  return { trainID, source, destination, status, ETA, speed, currentStation};
};

export function ManageTrains(){
  //demo data
    const [trains, setTrains] = useState([
        createData('T1', 'Howrah Jn.', 'Dhanbad Jn.', 'Delayed', '7:00', '40kmh','Howrah'),
        createData('T2', 'Asansol Jn.', 'Kharagpur Jn.', 'Halted', '12:00', '400kmh','Howrah'),
        createData('T3', 'Howrah Jn.', 'Dhanbad Jn.', 'Delayed', '15:00', '40kmh', 'Howrah'),
        createData('T5', 'Asansol Jn.', 'Kharagpur Jn.', 'Halted', '12:00', '400kmh','Howrah'),
        createData('T4', 'Howrah Jn.', 'Asansol Jn.', 'On Time', '21:00', '90kmh', 'Howrah'),
      ]);
      const [expandedRows, setExpandedRows] = useState([]);
      
      const stations = ['Howrah Jn.', 'Dhanbad Jn.', 'Kharagpur Jn.', 'Asansol Jn.', 'DumDum Jn.'];
      const operations = ['Start', 'Halt'];
    //filtering functions
    function filterByStatus(event){
        const filterStatus = event.target.value;
        // filtering on given status
        const filteredTrains = trains.filter((train) => {
            return train.status === filterStatus;
        });
        
        const rest = trains.filter((train) => {
            return train.status !== filterStatus;
        });
        
        //creating new List
        const newTrainsList = [...filteredTrains , ...rest];
        setTrains(newTrainsList);
    }
    function filterBySource(event){
        const filterSource = event.target.value;
        // filtering on given source
        const filteredTrains = trains.filter((train) => {
            return train.source === filterSource;
        });
        
        const rest = trains.filter((train) => {
            return train.source !== filterSource;
        });
        
        //creating new List
        const newTrainsList = [...filteredTrains , ...rest];
        setTrains(newTrainsList);
    }
    function filterByDestination(event){
        const filterDestination = event.target.value;
        // filtering on given status
        const filteredTrains = trains.filter((train) => {
            return train.destination === filterDestination;
        });
        
        const rest = trains.filter((train) => {
            return train.destination !== filterDestination;
        });
        
        //creating new List
        const newTrainsList = [...filteredTrains , ...rest];
        setTrains(newTrainsList);
    }
    function changeTrainStatus(event, tid){
      const newTrainStatus = event.target.value;
      const newTrains = trains.forEach((train) => {
            if(train.trainID === tid){
              if(newTrainStatus==='Start'){
                train.status='Delayed';
              }
              if(newTrainStatus==='Halt'){
                train.status='Halted';
              }
            }
        });
      setTrains([...newTrains]);
    }
    //function toggle row
  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className='container'>
        <h1 className='manage-trains-heading'>Manage Trains</h1>
        <div className='filter-container'>
        <label>Filter By Status:</label>
        <select className='filter-by-status' name='filterByStatus' onChange={(e) => filterByStatus(e)}>
            <option value=''>Filter By Status</option>
            <option value="On Time">On TIme</option>
            <option value="Delayed">Delayed</option>
            <option value="Halted">Halted</option>
            <option value="Arrived">Arrived</option>
            <option value="Cancelled">Cancelled</option>
        </select><br/>
        </div>
        <div className='filter-container'>
        <label>Filter By Start:</label>
        <select className='filter-by-source' name='filterBySource' onChange={(e) => filterBySource(e)}>
            <option value=''>Start</option>
            {stations.map((station) => <option value={station}>{station}</option>)}
        </select>
        </div>
        <div className='filter-container'>
        <label>Filter By Status:</label>
        <select className='filter-by-destination' name='filterByDestination' onChange={(e) => filterByDestination(e)}>
            <option value=''>Destination</option>
            {stations.map((station) => <option value={station}>{station}</option>)}
        </select>
        </div>
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Train ID</th>
          <th>Start</th>
          <th>Destination</th>
          <th>Status</th>
          <th>ETA</th>
          <th>More Details</th>
        </tr>
      </thead>
      <tbody>
        {trains.map(train => (
          <React.Fragment key={train.trainID}>
            <tr>
              <td>{train.trainID}</td>
              <td>{train.source}</td>
              <td>{train.destination}</td>
              <td>{train.status}</td>
              <td>{train.ETA}</td>
              <td>
                <button onClick={() => toggleRow(train.trainID)} style={{ cursor: 'pointer' }}>
                  {expandedRows.includes(train.trainID) ? '▼' : '▶'}
                </button>
              </td>
            </tr>
            {expandedRows.includes(train.trainID) && (
              <tr>
                <td>{train.trainID}</td>
                <td colSpan="4" style={{ backgroundColor: '#f9f9f9' }}>
                  Speed: {train.speed}<br/>
                  Current Station: {train.currentStation}
                </td>
                <td>
                  <label>Change Train Status:</label>
                  <select className='change-train-status' name='perfromOperation' onChange={(e) => changeTrainStatus(e, train.trainID)}>
                    <option value=''>Operation</option>
                    {operations.filter((operation) => {
                      if(train.status === 'On Time' || train.status==='Delayed'){return operation!=='Start'}
                      if(train.status==='Halted'){return operation!=='Halt'}
                    }).map((operation) => <option value={operation}>{operation}</option>)}
                  </select>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
}
