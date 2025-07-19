'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const shipments = [
  { id: 1, location: [38.89511, -77.03637], address: 'Washington, DC' },
  { id: 2, location: [40.7128, -74.006], address: 'New York, NY' },
];

export default function ShipmentMap() {
  return (
    <Box h="500px" mt={6} borderRadius="md" overflow="hidden">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipments.map(({ id, location, address }) => (
          <Marker key={id} position={location}>
            <Popup>{address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
}
