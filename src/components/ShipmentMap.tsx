'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

if (typeof window !== 'undefined') {
  const icon = L.icon({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = icon;
}

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
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shipments.map(({ id, originCoords, destinationCoords, origin, destination, status }) => {
          if (!originCoords || !destinationCoords) return null;

          const originKey = `${id}-origin`;
          const destKey = `${id}-dest`;
          const polylineKey = `${id}-polyline`;

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