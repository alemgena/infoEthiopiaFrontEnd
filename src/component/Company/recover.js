import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  FlyToInterpolator,
} from "react-map-gl";
import Mappin from "../../Mappin.svg";
import MyLocationIcon from "@mui/icons-material/MyLocation";
const MapContainer = ({ coordinates, companyName }) => {
  console.log(coordinates,companyName)
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    zoom: 14,
  });
  const goToCL = () => {
    setViewport({
      ...viewport,
      longitude: marker.longitude,
      latitude: marker.latitude,
      zoom: 14,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };
  const [marker, setMarker] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    setMarker({
      longitude: coordinates[1],
      latitude: coordinates[0],
    });
    setViewport({
      ...viewport,
      longitude: coordinates[1],
      latitude: coordinates[0],
    });
  }, [coordinates]);
  console.log("the map is error")
  return (
    <div className="mapContainer">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoicmNuZGMiLCJhIjoiY2t3MHFieXoxMTFpYTJwbm9oODVzemJ2dyJ9.gtaXKtU2le1TZZ0GYa_FJQ"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        <NavigationControl className="navigation-control" showCompass={false} />
        <Marker {...marker}>
          <button
            className="marker-btn"
          >
            <img src={Mappin} />
            {companyName}
          </button>
        </Marker>
  
      </ReactMapGL>
      <button onClick={goToCL} className="current__location">
        <MyLocationIcon />
      </button>
    </div>
  );
};

export default MapContainer;
