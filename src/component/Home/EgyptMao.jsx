import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const EgyptMap = () => {
  return (
    <MapContainer center={[26.8206, 30.8025]} zoom={6} style={{ width: '500px', height: '400px'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
      />
      {/* Add additional map layers, markers, etc. as needed */}
    </MapContainer>
  );
};

export default EgyptMap;
