'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
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
    Input,
} from '@chakra-ui/react';
import { Upload } from 'lucide-react';

// Dynamic import for ShipmentMap to avoid SSR issues
const ShipmentMap = dynamic(() => import('@/components/ShipmentMap'), { ssr: false });

type Shipment = {
    id: string;
    origin: string;
    originCoords: [number, number];
    destination: string;
    destinationCoords: [number, number];
    status: string;
    eta: string;
    notes?: string;
    doc?: File | null;
};

const initialShipments: Shipment[] = [
    {
        id: 'SHP001',
        origin: 'Warehouse A',
        originCoords: [38.89511, -77.03637],
        destination: 'Store 12',
        destinationCoords: [40.7128, -74.006],
        status: 'In Transit',
        eta: '2025-07-20T14:00:00Z',
        notes: '',
        doc: null,
    },
    {
        id: 'SHP002',
        origin: 'Warehouse B',
        originCoords: [41.8781, -87.6298],
        destination: 'Store 7',
        destinationCoords: [39.7392, -104.9903],
        status: 'Delivered',
        eta: '2025-07-18T10:30:00Z',
        notes: '',
        doc: null,
    },
    {
        id: 'SHP003',
        origin: 'Warehouse C',
        originCoords: [34.0522, -118.2437],
        destination: 'Store 3',
        destinationCoords: [36.1699, -115.1398],
        status: 'Delayed',
        eta: '2025-07-19T16:00:00Z',
        notes: '',
        doc: null,
    },
    {
        id: 'SHP004',
        origin: 'Warehouse D',
        originCoords: [29.7604, -95.3698],
        destination: 'Store 5',
        destinationCoords: [32.7767, -96.797],
        status: 'In Transit',
        eta: '2025-07-21T12:00:00Z',
        notes: '',
        doc: null,
    },
    {
        id: 'SHP005',
        origin: 'Warehouse E',
        originCoords: [39.9526, -75.1652],
        destination: 'Store 9',
        destinationCoords: [38.9072, -77.0369],
        status: 'Delivered',
        eta: '2025-07-17T09:00:00Z',
        notes: '',
        doc: null,
    },
];

const statuses = ['All', 'In Transit', 'Delivered', 'Delayed'] as const;

export default function Dashboard() {
    const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
    const [filterStatus, setFilterStatus] = useState<typeof statuses[number]>('All');
    const [sortByEtaAsc, setSortByEtaAsc] = useState(true);

    // Fully dynamic update every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShipments((prevShipments) =>
                prevShipments.map((shipment) => {
                    // Example: update coords slightly and toggle status for demo purposes
                    const [origLat, origLng] = shipment.originCoords;
                    const [destLat, destLng] = shipment.destinationCoords;

                    // Update coordinates +0.01 every 5s (looping back to original after a limit)
                    const newOrigLat = origLat + 0.01 > 40 ? 38.89511 : origLat + 0.01;
                    const newOrigLng = origLng + 0.01 > -70 ? -77.03637 : origLng + 0.01;

                    const newDestLat = destLat + 0.01 > 42 ? 40.7128 : destLat + 0.01;
                    const newDestLng = destLng + 0.01 > -70 ? -74.006 : destLng + 0.01;

                    // For demo: randomly toggle status between In Transit and Delivered
                    const newStatus =
                        shipment.status === 'In Transit'
                            ? 'Delivered'
                            : shipment.status === 'Delivered'
                                ? 'Delayed'
                                : 'In Transit';

                    // For demo: advance ETA by 1 minute each update
                    const newEta = new Date(new Date(shipment.eta).getTime() + 60000).toISOString();

                    return {
                        ...shipment,
                        originCoords: [newOrigLat, newOrigLng],
                        destinationCoords: [newDestLat, newDestLng],
                        status: newStatus,
                        eta: newEta,
                    };
                })
            );
        }, 3000);

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
    const avgDeliveryTime = 38;

    const formatETA = (eta: string) => {
        const date = new Date(eta);
        return date.toLocaleString();
    };

    const exportToCSV = () => {
        const header = ['Shipment ID', 'Origin', 'Destination', 'Status', 'ETA', 'Notes', 'Document'];
        const rows = filteredShipments.map((s) => [s.id, s.origin, s.destination, s.status, formatETA(s.eta), s.notes || '', s.doc?.name || '']);
        const csvContent = [header, ...rows].map((e) => e.map((cell) => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'shipments.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleNotesChange = (id: string, value: string) => {
        setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, notes: value } : s)));
    };

    const handleFileChange = (id: string, file: File | null) => {
        setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, doc: file } : s)));
    };

    return (
        <Box p={0}>
            <Box
                mb={6}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={4}
                bg="gray.100"
                borderRadius="md"
            >
                <Heading size="md">Admin Dashboard</Heading>
                <Box display="flex" alignItems="center" gap={3}>
                    <Text fontWeight="medium">Welcome, Admin</Text>
                    <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg="blue.500"
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                    >
                        A
                    </Box>
                </Box>
            </Box>

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

            <Heading size="md" mb={4}>
                Live Shipment Map
            </Heading>

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
                        <Th>Notes</Th>
                        <Th>Upload Document</Th>
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

                            <Td>
                                <Input
                                    size="sm"
                                    placeholder="Add notes"
                                    value={shipment.notes || ''}
                                    onChange={(e) => handleNotesChange(shipment.id, e.target.value)}
                                />
                            </Td>

                            <Td>
                                <input
                                    type="file"
                                    id={`file-upload-${shipment.id}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) =>
                                        handleFileChange(shipment.id, e.target.files ? e.target.files[0] : null)
                                    }
                                />
                                <label htmlFor={`file-upload-${shipment.id}`}>
                                    <Button as="span" size="sm" leftIcon={<Upload size={16} />} colorScheme="blue">
                                        {shipment.doc ? 'Change File' : 'Upload File'}
                                    </Button>
                                </label>
                                {shipment.doc && (
                                    <Text mt={1} fontSize="xs" isTruncated maxW="150px" title={shipment.doc.name}>
                                        {shipment.doc.name}
                                    </Text>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}