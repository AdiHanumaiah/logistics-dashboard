'use client';

import { useState, useEffect, useMemo } from 'react';
import ShipmentMap from '@/components/ShipmentMap';
import {
    Box,
    Button,
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
    Select,
} from '@chakra-ui/react';

// Initial shipment data
const initialShipments = [
    {
        id: 'SHP001',
        origin: 'Warehouse A',
        originCoords: [38.89511, -77.03637],
        destination: 'Store 12',
        destinationCoords: [40.7128, -74.006],
        status: 'In Transit',
        eta: '2025-07-20T14:00:00Z',
    },
    {
        id: 'SHP002',
        origin: 'Warehouse B',
        originCoords: [41.8781, -87.6298],
        destination: 'Store 7',
        destinationCoords: [39.7392, -104.9903],
        status: 'Delivered',
        eta: '2025-07-18T10:30:00Z',
    },
    {
        id: 'SHP003',
        origin: 'Warehouse C',
        originCoords: [34.0522, -118.2437],
        destination: 'Store 3',
        destinationCoords: [36.1699, -115.1398],
        status: 'Delayed',
        eta: '2025-07-19T16:00:00Z',
    },
    {
        id: 'SHP004',
        origin: 'Warehouse D',
        originCoords: [29.7604, -95.3698],
        destination: 'Store 5',
        destinationCoords: [32.7767, -96.797],
        status: 'In Transit',
        eta: '2025-07-21T12:00:00Z',
    },
    {
        id: 'SHP005',
        origin: 'Warehouse E',
        originCoords: [39.9526, -75.1652],
        destination: 'Store 9',
        destinationCoords: [38.9072, -77.0369],
        status: 'Delivered',
        eta: '2025-07-17T09:00:00Z',
    },
];

const statuses = ['All', 'In Transit', 'Delivered', 'Delayed'] as const;

export default function Dashboard() {
    const [shipments, setShipments] = useState(initialShipments);
    const [filterStatus, setFilterStatus] = useState<typeof statuses[number]>('All');
    const [sortByEtaAsc, setSortByEtaAsc] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShipments((prevShipments) =>
                prevShipments.map((shipment) => {
                    // Randomize ETA slightly
                    const etaDate = new Date(shipment.eta);
                    const randomMinutes = Math.floor(Math.random() * 11) - 5;
                    etaDate.setMinutes(etaDate.getMinutes() + randomMinutes);

                    // Higher chance to change status
                    let newStatus = shipment.status;
                    if (Math.random() < 0.5) { // 50% chance to change
                        if (shipment.status === 'In Transit') newStatus = 'Delivered';
                        else if (shipment.status === 'Delivered') newStatus = 'Delayed';
                        else if (shipment.status === 'Delayed') newStatus = 'In Transit';
                    }

                    // Slightly change route coordinates
                    const randomShift = () => (Math.random() - 0.5) * 0.1;
                    const newOriginCoords = [
                        shipment.originCoords[0] + randomShift(),
                        shipment.originCoords[1] + randomShift(),
                    ];
                    const newDestinationCoords = [
                        shipment.destinationCoords[0] + randomShift(),
                        shipment.destinationCoords[1] + randomShift(),
                    ];

                    return {
                        ...shipment,
                        eta: etaDate.toISOString(),
                        status: newStatus,
                        originCoords: newOriginCoords,
                        destinationCoords: newDestinationCoords,
                    };
                })
            );
        }, 2000); // update every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const filteredShipments = useMemo(() => {
        let filtered = filterStatus === 'All' ? shipments : shipments.filter((s) => s.status === filterStatus);
        filtered = filtered.sort((a, b) => {
            const dateA = new Date(a.eta);
            const dateB = new Date(b.eta);
            return sortByEtaAsc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
        return filtered;
    }, [shipments, filterStatus, sortByEtaAsc]);

    const activeDeliveries = shipments.filter((s) => s.status === 'In Transit').length;
    const onTimeRate = Math.round((shipments.filter((s) => s.status === 'Delivered').length / shipments.length) * 100);
    const avgDeliveryTime = 38; // static for now

    const formatETA = (eta: string) => {
        const date = new Date(eta);
        return date.toLocaleString();
    };

    // Export filtered shipments to CSV
    const exportToCSV = () => {
        const header = ['Shipment ID', 'Origin', 'Destination', 'Status', 'ETA'];
        const rows = filteredShipments.map(s => [
            s.id,
            s.origin,
            s.destination,
            s.status,
            formatETA(s.eta),
        ]);
        const csvContent =
            [header, ...rows]
                .map(e => e.map(cell => `"${cell}"`).join(','))
                .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'shipments.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

            <Heading size="md" mb={4}>Live Shipment Map</Heading>

            <Box h="400px" mb={6}>
                <ShipmentMap shipments={filteredShipments} />
            </Box>

            <Box mb={4} display="flex" alignItems="center" gap={4}>
                <Text>Filter by Status:</Text>
                <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                    maxW="200px"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </Select>

                <Text>Sort by ETA:</Text>
                <Select
                    value={sortByEtaAsc ? 'asc' : 'desc'}
                    onChange={(e) => setSortByEtaAsc(e.target.value === 'asc')}
                    maxW="150px"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Select>

                <Button colorScheme="blue" onClick={exportToCSV}>
                    Export Table to CSV
                </Button>
            </Box>

            <Heading size="md" mb={4}>Recent Shipments</Heading>

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
                    {filteredShipments.map((shipment) => (
                        <Tr key={shipment.id}>
                            <Td>{shipment.id}</Td>
                            <Td>{shipment.origin}</Td>
                            <Td>{shipment.destination}</Td>
                            <Td>{shipment.status}</Td>
                            <Td>{formatETA(shipment.eta)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}