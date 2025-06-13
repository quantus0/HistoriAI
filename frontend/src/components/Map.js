import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ events }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events
        .filter((event) => event.location && event.location.coordinates)
        .map((event, index) => (
          <Marker key={index} position={event.location.coordinates}>
            <Popup>{event.title} ({event.year})</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}