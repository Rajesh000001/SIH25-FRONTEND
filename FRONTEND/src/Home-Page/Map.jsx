import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './Home-Page.css';

//demo data
function createData(trainID, trainName, Speed, Latitude, Longitude, status, Start, Destination, trackID){
  return {trainID, trainName, Speed, Latitude, Longitude, status, Start, Destination, trackID};
}

export function Map() {
  const [trainData, setTrainData] = useState([
    createData('T2', 'Vande Bharat', '124Km/Hr', 22.588022, 88.334870, 'On Time', 'Howrah Jn.', 'Ranchi', 'Track01'),
    createData('T3', 'Rajdhani', '109Km/Hr', 22.5883821, 88.3346191, 'Delayed', 'Dum Dum', 'Sealdah', 'Track13'),]);
    
  const [onTime,setOnTime] = useState(trainData.filter((train) => train.status === "On Time"));
  const [delayed,setDelayed] = useState(trainData.filter((train) => train.status === "Delayed"));
  const [reRouted,seReRouted] = useState(trainData.filter((train) => train.status === "Rerouted"));
  const [halted,setHalted] = useState(trainData.filter((train) => train.status === "Halted"));

  function handleClick(e,tid){
    const displayDetails = document.querySelector('.display-text');
    trainData.forEach((train)=>{
      if(train.trainID===tid){
        // displayDetails.textContent=`Train ID: ${train.trainID}\n
        //                             Train Name: ${train.trainName}\n
        //                             Speed: ${train.Speed}\n
        //                             Start: ${train.Start}\n
        //                             Destination: ${train.Destination}\n
        //                             Status: ${train.status}\n
        //                             Track ID: ${train.trackID}\n`
        displayDetails.innerHTML = `<h1 class="detail-heading">Train Details</h1><br/>
                            Train ID: <span class="detail-highlight">${train.trainID}</span><br/>
                            Train Name: <span class="detail-highlight">${train.trainName}</span><br/>
                            Speed: <span class="detail-highlight">${train.Speed}</span><br/>
                            Start: <span class="detail-highlight">${train.Start}</span><br/>
                            Destination: <span class="detail-highlight">${train.Destination}</span><br/>
                            Status: <span class="detail-highlight">${train.status}</span><br/>
                            Track ID: <span class="detail-highlight">${train.trackID}</span>`;
      }
    })
  }
  return (
    <div className="page-container">
      <MapContainer center={[22.588022, 88.334870]} zoom={19} className="map-view">
        {/* Base map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Circle */}
        {onTime.map(train=>(
          <Circle
          key={train.trainID}
          center={[train.Latitude, train.Longitude]}
          radius={1.5}
          pathOptions={{ color: "rgba(26, 255, 0, 1)", fillColor: "rgba(26, 255, 0, 1)", fillOpacity: 1}}
              eventHandlers={{
                click: (e) => handleClick(e, train.trainID),
              }}>
              <Popup>{train.trainName} <br/> {train.Speed}
              </Popup>
          </Circle>
        ))}
        {halted.map(train=>(
          <Circle
          key={train.trainID}
            center={[train.Latitude, train.Longitude]}
            radius={1.5}
            pathOptions={{ color: "red", fillColor: "rgba(255, 0, 0, 1)", fillOpacity: 1}}
            eventHandlers={{
              click: (e) => handleClick(e, train.trackID),
            }}>
              <Popup>{train.trainName + '\n' +train.Speed}</Popup>
          </Circle>
        ))}
        {delayed.map(train=>(
          <Circle
          key={train.trainID}
            center={[train.Latitude, train.Longitude]}
            radius={1.5}
            pathOptions={{ color: "yellow", fillColor: "rgba(242, 255, 0, 1)", fillOpacity: 1}}
            eventHandlers={{
                click: (e) => handleClick(e, train.trainID),
              }}>
              <Popup>{train.trainName + '\n' +train.Speed}</Popup>
          </Circle>
        ))}
        {reRouted.map(train=>(
          <Circle
            center={[train.Latitude, train.Longitude]}
            radius={1.5}
            pathOptions={{ color: "blue", fillColor: "rgba(17, 0, 255, 1)", fillOpacity: 1}}>
            eventHandlers={{
              click: (e) => handleClick(e, train.trainID),
            }}
              <Popup>{train.trainName + '\n' +train.Speed}</Popup>
          </Circle>
        ))}
      </MapContainer>
      <br/>
      <div className="display-train-details">
        <p className="display-text"><h1 className="detail-heading">Train Details:</h1></p>
      </div>
    </div>

  );
}
