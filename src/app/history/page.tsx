'use client';

import { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Badge,
} from '@chakra-ui/react';

export default function ShipmentHistoryPage() {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('dashboardShipments');
        if (saved) {
            setShipments(JSON.parse(saved));
        }
    }, []);

    // Filter for delivered only
    const deliveredShipments = shipments.filter((s) => s.status === 'Delivered');

    return (
        <Box p={8} maxW="7xl" mx="auto">
            <Heading mb={6}>Shipment History (Delivered)</Heading>

            {deliveredShipments.length === 0 ? (
                <Text>No delivered shipments yet.</Text>
            ) : (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Shipment ID</Th>
                            <Th>Tracking #</Th>
                            <Th>Sender</Th>
                            <Th>Recipient</Th>
                            <Th>Origin</Th>
                            <Th>Destination</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {deliveredShipments.map((shipment) => (
                            <Tr key={shipment.id}>
                                <Td>{shipment.id}</Td>
                                <Td>{shipment.trackingNumber}</Td>
                                <Td>{shipment.sender}</Td>
                                <Td>{shipment.recipient}</Td>
                                <Td>{shipment.origin}</Td>
                                <Td>{shipment.destination}</Td>
                                <Td>
                                    <Badge colorScheme="green">{shipment.status}</Badge>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
}
