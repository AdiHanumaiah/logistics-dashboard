'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
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
  {
    id: 1,
    origin: {
      name: 'Warehouse A',
      coords: [38.89511, -77.03637], // Washington, DC
    },
    destination: {
      name: 'Store 12',
      coords: [40.7128, -74.006], // New York, NY
    },
    status: 'In Transit',
  },
  {
    id: 2,
    origin: {
      name: 'Warehouse B',
      coords: [41.8781, -87.6298], // Chicago, IL
    },
    destination: {
      name: 'Store 7',
      coords: [39.7392, -104.9903], // Denver, CO
    },
    status: 'Delivered',
  },
  {
    id: 3,
    origin: {
      name: 'Warehouse C',
      coords: [34.0522, -118.2437], // Los Angeles, CA
    },
    destination: {
      name: 'Store 3',
      coords: [36.1699, -115.1398], // Las Vegas, NV
    },
    status: 'Delayed',
  },
];

// Helper to assign colors by status
const statusColor = {
  'In Transit': 'blue',
  'Delivered': 'green',
  'Delayed': 'red',
};

export default function ShipmentMap() {
  return (
    <Box h="100%" w="100%">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipments.map(({ id, origin, destination, status }) => (
          <>
            <Marker key={`origin-${id}`} position={origin.coords}>
              <Popup>{origin.name}</Popup>
            </Marker>
            <Marker key={`dest-${id}`} position={destination.coords}>
              <Popup>{destination.name}</Popup>
            </Marker>
            <Polyline
              key={`line-${id}`}
              positions={[origin.coords, destination.coords]}
              pathOptions={{ color: statusColor[status as keyof typeof statusColor], weight: 4 }}
            />
          </>
        ))}
      </MapContainer>
    </Box>
  );
}