'use client';

import { useState, useEffect } from 'react';
import ShipmentMap from '@/components/ShipmentMap';
import {
    Box,
    Heading,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    VStack,
} from '@chakra-ui/react';

function generateRandomShipments() {
    const statuses = ['In Transit', 'Delivered', 'Delayed'];
    const randomTime = () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() + Math.floor(Math.random() * 120));
        return date.toISOString().slice(0, 16).replace('T', ' ');
    };

    return [
        {
            id: 'SHP001',
            origin: 'Warehouse A',
            destination: 'Store 12',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            eta: randomTime(),
        },
        {
            id: 'SHP002',
            origin: 'Warehouse B',
            destination: 'Store 7',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            eta: randomTime(),
        },
        {
            id: 'SHP003',
            origin: 'Warehouse C',
            destination: 'Store 3',
            status: statuses[Math.floor(Math.random() * statuses.length)],
            eta: randomTime(),
        },
    ];
}

export default function Dashboard() {
    const [shipments, setShipments] = useState(generateRandomShipments());
    const [activeDeliveries, setActiveDeliveries] = useState(42);
    const [onTimeRate, setOnTimeRate] = useState(94);
    const [avgDeliveryTime, setAvgDeliveryTime] = useState(38);

    useEffect(() => {
        const interval = setInterval(() => {
            setShipments(generateRandomShipments());
            setActiveDeliveries(30 + Math.floor(Math.random() * 30));
            setOnTimeRate(85 + Math.floor(Math.random() * 15));
            setAvgDeliveryTime(30 + Math.floor(Math.random() * 20));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box p={10}>
            <Heading mb={6}>Dashboard</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
                <Stat>
                    <StatLabel>Active Deliveries</StatLabel>
                    <StatNumber>{activeDeliveries}</StatNumber>
                    <Text>Currently in progress</Text>
                </Stat>

                <Stat>
                    <StatLabel>On-Time Rate</StatLabel>
                    <StatNumber>{onTimeRate}%</StatNumber>
                    <Text>Deliveries on time this week</Text>
                </Stat>

                <Stat>
                    <StatLabel>Avg. Delivery Time</StatLabel>
                    <StatNumber>{avgDeliveryTime} mins</StatNumber>
                    <Text>Last 7 days average</Text>
                </Stat>
            </SimpleGrid>

            <VStack spacing={6} align="stretch">
                <Box>
                    <Heading size="md" mb={4}>
                        Live Shipment Map
                    </Heading>
                    <Box h="400px" borderRadius="md" overflow="hidden">
                        <ShipmentMap />
                    </Box>
                </Box>

                <Box>
                    <Heading size="md" mb={4}>
                        Recent Shipments
                    </Heading>

                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>Shipment ID</Th>
                                <Th>Origin</Th>
                                <Th>Destination</Th>
                                <Th>Status</Th>
                                <Th>ETA</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {shipments.map((shipment) => (
                                <Tr key={shipment.id}>
                                    <Td>{shipment.id}</Td>
                                    <Td>{shipment.origin}</Td>
                                    <Td>{shipment.destination}</Td>
                                    <Td>{shipment.status}</Td>
                                    <Td>{shipment.eta}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </VStack>
        </Box>
    );
}