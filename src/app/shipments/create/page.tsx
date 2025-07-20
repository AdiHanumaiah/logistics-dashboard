'use client';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Badge,
    Divider,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function CreateShipmentPage() {
    const toast = useToast();
    const [shipments, setShipments] = useState([]);
    const [form, setForm] = useState({
        sender: '',
        recipient: '',
        origin: '',
        destination: '',
        packageDetails: '',
    });

    const [selectedLabel, setSelectedLabel] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Load only "Label Printed" shipments
    useEffect(() => {
        const all = JSON.parse(localStorage.getItem('shipments') || '[]');
        const filtered = all.filter((s) => s.status === 'Label Printed');
        setShipments(filtered);
    }, []);

    const updateStorage = (newShipmentList) => {
        const all = JSON.parse(localStorage.getItem('shipments') || '[]');
        const merged = [
            ...newShipmentList,
            ...all.filter((s) => s.status !== 'Label Printed'),
        ];
        localStorage.setItem('shipments', JSON.stringify(merged));
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        const { sender, recipient, origin, destination, packageDetails } = form;

        if (!sender || !recipient || !origin || !destination || !packageDetails) {
            toast({
                title: 'Missing Fields',
                description: 'Please fill out all fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const newShipment = {
            id: uuidv4().split('-')[0],
            trackingNumber: 'TRK-' + Math.floor(Math.random() * 1000000000),
            sender,
            recipient,
            origin,
            destination,
            packageDetails,
            status: 'Label Printed',
        };

        const updated = [newShipment, ...shipments];
        setShipments(updated);
        updateStorage(updated);

        toast({
            title: 'Shipment Created',
            description: `Tracking #: ${newShipment.trackingNumber}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setForm({ sender: '', recipient: '', origin: '', destination: '', packageDetails: '' });
    };

    const openLabelModal = (shipment: any) => {
        setSelectedLabel(shipment);
        onOpen();
    };

    return (
        <Box p={8} maxW="6xl" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Create Shipment
            </Text>
            <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                    <FormLabel>Sender Name</FormLabel>
                    <Input name="sender" value={form.sender} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Recipient Name</FormLabel>
                    <Input name="recipient" value={form.recipient} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Origin Address</FormLabel>
                    <Input name="origin" value={form.origin} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Destination Address</FormLabel>
                    <Input name="destination" value={form.destination} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Package Details</FormLabel>
                    <Input name="packageDetails" value={form.packageDetails} onChange={handleChange} />
                </FormControl>
                <Button colorScheme="teal" onClick={handleSubmit} alignSelf="start">
                    Create Shipment
                </Button>
            </VStack>

            {shipments.length > 0 && (
                <Box mt={12}>
                    <Divider mb={6} />
                    <Text fontSize="xl" fontWeight="semibold" mb={4}>
                        Pending Shipments
                    </Text>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Tracking #</Th>
                                <Th>Sender</Th>
                                <Th>Recipient</Th>
                                <Th>Status</Th>
                                <Th>Label</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {shipments.map((shipment) => (
                                <Tr key={shipment.id}>
                                    <Td>{shipment.id}</Td>
                                    <Td>{shipment.trackingNumber}</Td>
                                    <Td>{shipment.sender}</Td>
                                    <Td>{shipment.recipient}</Td>
                                    <Td>
                                        <Badge colorScheme="yellow">{shipment.status}</Badge>
                                    </Td>
                                    <Td>
                                        <Button size="sm" onClick={() => openLabelModal(shipment)}>
                                            Print Label
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}

            {selectedLabel && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Shipping Label</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text><strong>Tracking #:</strong> {selectedLabel.trackingNumber}</Text>
                            <Text><strong>Sender:</strong> {selectedLabel.sender}</Text>
                            <Text><strong>Recipient:</strong> {selectedLabel.recipient}</Text>
                            <Text><strong>Origin:</strong> {selectedLabel.origin}</Text>
                            <Text><strong>Destination:</strong> {selectedLabel.destination}</Text>
                            <Text><strong>Package:</strong> {selectedLabel.packageDetails}</Text>
                            <Text><strong>Status:</strong> {selectedLabel.status}</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}
