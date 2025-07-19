'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React from 'react';

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type Shipment = {
  id: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  // You can add coordinates here if needed for markers
  originCoords?: [number, number];
  destinationCoords?: [number, number];
};

export default function ShipmentMap({ shipments }: { shipments: Shipment[] }) {
  // Provide some fallback if shipments undefined or empty
  if (!shipments || shipments.length === 0) {
    return <Box h="400px">No shipments to display on map</Box>;
  }

  // Example: You need coordinates to display markers/lines — make sure your shipments have them!
  // For demo purposes, I’ll assume each shipment has originCoords and destinationCoords.

  return (
    <Box h="100%" w="100%">
      <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipments.map(({ id, originCoords, destinationCoords, origin, destination, status }) => {
          if (!originCoords || !destinationCoords) return null;
          return (
            <React.Fragment key={id}>
              <Marker position={originCoords}>
                <Popup>{origin}</Popup>
              </Marker>
              <Marker position={destinationCoords}>
                <Popup>{destination}</Popup>
              </Marker>
              <Polyline
                positions={[originCoords, destinationCoords]}
                pathOptions={{
                  color:
                    status === 'In Transit'
                      ? 'blue'
                      : status === 'Delivered'
                        ? 'green'
                        : 'red',
                  weight: 4,
                }}
              />
            </React.Fragment>
          );
        })}
      </MapContainer>
    </Box>
  );
}