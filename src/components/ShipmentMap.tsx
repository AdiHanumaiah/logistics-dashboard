'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect } from 'react';

// Fix default icon issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: () => void })._getIconUrl;
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
  originCoords?: [number, number];
  destinationCoords?: [number, number];
};

function MapBoundsUpdater({ shipments }: { shipments: Shipment[] }) {
  const map = useMap();

  useEffect(() => {
    const points: L.LatLngExpression[] = [];

    shipments.forEach(({ originCoords, destinationCoords }) => {
      if (originCoords) points.push(originCoords);
      if (destinationCoords) points.push(destinationCoords);
    });

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }
  }, [shipments, map]);

  return null;
}

export default function ShipmentMap({ shipments }: { shipments: Shipment[] }) {
  if (!shipments || shipments.length === 0) {
    return <Box h="400px">No shipments to display on map</Box>;
  }

  return (
    <Box h="100%" w="100%">
      <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {shipments.map(({ id, originCoords, destinationCoords, origin, destination, status }) => {
          if (!originCoords || !destinationCoords) return null;

          const originKey = `${id}-origin-${originCoords[0].toFixed(5)}-${originCoords[1].toFixed(5)}`;
          const destKey = `${id}-dest-${destinationCoords[0].toFixed(5)}-${destinationCoords[1].toFixed(5)}`;
          const polylineKey = `${id}-polyline-${originCoords[0].toFixed(5)}-${originCoords[1].toFixed(5)}-${destinationCoords[0].toFixed(5)}-${destinationCoords[1].toFixed(5)}`;

          return (
            <React.Fragment key={id}>
              <Marker key={originKey} position={originCoords}>
                <Popup>{origin}</Popup>
              </Marker>
              <Marker key={destKey} position={destinationCoords}>
                <Popup>{destination}</Popup>
              </Marker>
              <Polyline
                key={polylineKey}
                positions={[originCoords, destinationCoords]}
                pathOptions={{
                  color: status === 'In Transit' ? 'blue' : status === 'Delivered' ? 'green' : 'red',
                  weight: 4,
                }}
              />
            </React.Fragment>
          );
        })}
        <MapBoundsUpdater shipments={shipments} />
      </MapContainer>
    </Box>
  );
}