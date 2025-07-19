'use client';

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
    VStack,          // <-- Import VStack here
} from '@chakra-ui/react';

const mockShipments = [
    {
        id: 'SHP001',
        origin: 'Warehouse A',
        destination: 'Store 12',
        status: 'In Transit',
        eta: '2025-07-20 14:00',
    },
    {
        id: 'SHP002',
        origin: 'Warehouse B',
        destination: 'Store 7',
        status: 'Delivered',
        eta: '2025-07-18 10:30',
    },
    {
        id: 'SHP003',
        origin: 'Warehouse C',
        destination: 'Store 3',
        status: 'Delayed',
        eta: '2025-07-19 16:00',
    },
];

export default function Dashboard() {
    return (
        <Box p={10}>
            <Heading mb={6}>Dashboard</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
                <Stat>
                    <StatLabel>Active Deliveries</StatLabel>
                    <StatNumber>42</StatNumber>
                    <Text>Currently in progress</Text>
                </Stat>

                <Stat>
                    <StatLabel>On-Time Rate</StatLabel>
                    <StatNumber>94%</StatNumber>
                    <Text>Deliveries on time this week</Text>
                </Stat>

                <Stat>
                    <StatLabel>Avg. Delivery Time</StatLabel>
                    <StatNumber>38 mins</StatNumber>
                    <Text>Last 7 days average</Text>
                </Stat>
            </SimpleGrid>

            {/* Wrap map and table in VStack with spacing */}
            <VStack spacing={8} align="stretch">
                <Box>
                    <Heading size="md" mb={4}>
                        Live Shipment Map
                    </Heading>
                    {/* Add borderRadius and overflow here for neat edges */}
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
                            {mockShipments.map((shipment) => (
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
