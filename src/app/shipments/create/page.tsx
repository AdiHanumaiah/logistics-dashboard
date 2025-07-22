"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Heading,
    Stack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useToast,
    Badge,
} from "@chakra-ui/react";

interface Address {
    name: string;
    street1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface Parcel {
    length: string;
    width: string;
    height: string;
    weight: string;
}

interface Shipment {
    id: string;
    from: Address;
    to: Address;
    parcel: Parcel;
    carrier: string;
    service: string;
    trackingNumber: string;
    labelUrl: string;
    status: string;
}

function generateFakeTrackingNumber() {
    return (
        Math.random().toString(36).substring(2, 10).toUpperCase() +
        Math.floor(Math.random() * 9999)
    );
}

function generateFakeLabelUrl() {
    return "https://via.placeholder.com/350x150?text=Shipping+Label";
}

export default function CreateShipmentPage() {
    const [from, setFrom] = useState<Address>({
        name: "",
        street1: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
    });
    const [to, setTo] = useState<Address>({
        name: "",
        street1: "",
        city: "",
        state: "",
        zip: "",
        country: "US",
    });
    const [parcel, setParcel] = useState<Parcel>({
        length: "",
        width: "",
        height: "",
        weight: "",
    });
    const [carrier, setCarrier] = useState("Shippo");
    const [service, setService] = useState("Priority");

    const [shipments, setShipments] = useState<Shipment[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
        null
    );
    const toast = useToast();

    useEffect(() => {
        const stored = localStorage.getItem("shipments");
        if (stored) {
            setShipments(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("shipments", JSON.stringify(shipments));
    }, [shipments]);

    function handleFromChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFrom({ ...from, [e.target.name]: e.target.value });
    }
    function handleToChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTo({ ...to, [e.target.name]: e.target.value });
    }
    function handleParcelChange(e: React.ChangeEvent<HTMLInputElement>) {
        setParcel({ ...parcel, [e.target.name]: e.target.value });
    }

    function createShipment() {
        if (
            !from.name ||
            !from.street1 ||
            !from.city ||
            !from.state ||
            !from.zip ||
            !to.name ||
            !to.street1 ||
            !to.city ||
            !to.state ||
            !to.zip ||
            !parcel.length ||
            !parcel.width ||
            !parcel.height ||
            !parcel.weight
        ) {
            alert("Please fill out all required fields.");
            return;
        }

        const trackingNumber = generateFakeTrackingNumber();
        const labelUrl = generateFakeLabelUrl();

        const newShipment: Shipment = {
            id: Date.now().toString(),
            from,
            to,
            parcel,
            carrier,
            service,
            trackingNumber,
            labelUrl,
            status: "Label Printed",
        };

        setShipments([...shipments, newShipment]);

        setFrom({
            name: "",
            street1: "",
            city: "",
            state: "",
            zip: "",
            country: "US",
        });
        setTo({
            name: "",
            street1: "",
            city: "",
            state: "",
            zip: "",
            country: "US",
        });
        setParcel({ length: "", width: "", height: "", weight: "" });
        setCarrier("Shippo");
        setService("Priority");

        toast({
            title: "Shipment created.",
            description: "Your shipment has been added and is pending.",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "bottom-right",
        });
    }

    function openLabelModal(shipment: Shipment) {
        setSelectedShipment(shipment);
        onOpen();
    }

    return (
        <Container maxW="7xl" py={10}>
            <Heading mb={6}>Create Shipment</Heading>
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={8}
                mb={10}
                flexWrap="wrap"
            >
                {/* From Address */}
                <Box flex="1" minW={{ base: "100%", md: "350px" }}>
                    <Heading size="md" mb={4}>
                        From Address
                    </Heading>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            value={from.name}
                            onChange={handleFromChange}
                            placeholder="Sender Name"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Street Address</FormLabel>
                        <Input
                            name="street1"
                            value={from.street1}
                            onChange={handleFromChange}
                            placeholder="123 Main St"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                            name="city"
                            value={from.city}
                            onChange={handleFromChange}
                            placeholder="City"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                            name="state"
                            value={from.state}
                            onChange={handleFromChange}
                            placeholder="State"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>ZIP</FormLabel>
                        <Input
                            name="zip"
                            value={from.zip}
                            onChange={handleFromChange}
                            placeholder="ZIP Code"
                        />
                    </FormControl>
                    <FormControl mb={2}>
                        <FormLabel>Country</FormLabel>
                        <Input
                            name="country"
                            value={from.country}
                            onChange={handleFromChange}
                            placeholder="Country"
                            disabled
                        />
                    </FormControl>
                </Box>

                {/* To Address */}
                <Box flex="1" minW={{ base: "100%", md: "350px" }}>
                    <Heading size="md" mb={4}>
                        To Address
                    </Heading>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            value={to.name}
                            onChange={handleToChange}
                            placeholder="Recipient Name"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Street Address</FormLabel>
                        <Input
                            name="street1"
                            value={to.street1}
                            onChange={handleToChange}
                            placeholder="123 Main St"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                            name="city"
                            value={to.city}
                            onChange={handleToChange}
                            placeholder="City"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                            name="state"
                            value={to.state}
                            onChange={handleToChange}
                            placeholder="State"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>ZIP</FormLabel>
                        <Input
                            name="zip"
                            value={to.zip}
                            onChange={handleToChange}
                            placeholder="ZIP Code"
                        />
                    </FormControl>
                    <FormControl mb={2}>
                        <FormLabel>Country</FormLabel>
                        <Input
                            name="country"
                            value={to.country}
                            onChange={handleToChange}
                            placeholder="Country"
                            disabled
                        />
                    </FormControl>
                </Box>

                {/* Parcel Details */}
                <Box flex="1" minW={{ base: "100%", md: "350px" }}>
                    <Heading size="md" mb={4}>
                        Parcel Details
                    </Heading>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Length (inches)</FormLabel>
                        <Input
                            type="number"
                            min="0"
                            step="any"
                            name="length"
                            value={parcel.length}
                            onChange={handleParcelChange}
                            placeholder="Length"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Width (inches)</FormLabel>
                        <Input
                            type="number"
                            min="0"
                            step="any"
                            name="width"
                            value={parcel.width}
                            onChange={handleParcelChange}
                            placeholder="Width"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Height (inches)</FormLabel>
                        <Input
                            type="number"
                            min="0"
                            step="any"
                            name="height"
                            value={parcel.height}
                            onChange={handleParcelChange}
                            placeholder="Height"
                        />
                    </FormControl>
                    <FormControl mb={2} isRequired>
                        <FormLabel>Weight (lbs)</FormLabel>
                        <Input
                            type="number"
                            min="0"
                            step="any"
                            name="weight"
                            value={parcel.weight}
                            onChange={handleParcelChange}
                            placeholder="Weight"
                        />
                    </FormControl>
                </Box>

                {/* Carrier and Service */}
                <Box flex="1" minW={{ base: "100%", md: "350px" }}>
                    <Heading size="md" mb={4}>
                        Carrier & Service
                    </Heading>
                    <FormControl mb={4}>
                        <FormLabel>Carrier</FormLabel>
                        <Select
                            value={carrier}
                            onChange={(e) => setCarrier(e.target.value)}
                        >
                            <option>Shippo</option>
                            <option>FedEx</option>
                            <option>UPS</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={4}>
                        <FormLabel>Service Level</FormLabel>
                        <Select value={service} onChange={(e) => setService(e.target.value)}>
                            <option>Priority</option>
                            <option>Ground</option>
                            <option>Express</option>
                        </Select>
                    </FormControl>

                    <Button colorScheme="teal" onClick={createShipment} width="full">
                        Create Shipment
                    </Button>
                </Box>
            </Stack>

            {/* Shipments Table */}
            <Box mt={10}>
                <Heading size="lg" mb={4}>
                    Pending Shipments
                </Heading>
                {shipments.length === 0 ? (
                    <Text>No shipments created yet.</Text>
                ) : (
                    <Table variant="simple" size="sm" overflowX="auto">
                        <Thead>
                            <Tr>
                                <Th>Tracking #</Th>
                                <Th>From</Th>
                                <Th>To</Th>
                                <Th>Carrier</Th>
                                <Th>Status</Th>
                                <Th>Label</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {shipments.map((s) => (
                                <Tr key={s.id}>
                                    <Td>{s.trackingNumber}</Td>
                                    <Td>
                                        {s.from.name}, {s.from.city}
                                    </Td>
                                    <Td>
                                        {s.to.name}, {s.to.city}
                                    </Td>
                                    <Td>{s.carrier}</Td>
                                    <Td>
                                        <Badge colorScheme="yellow">{s.status}</Badge>
                                    </Td>
                                    <Td>
                                        <Button size="xs" onClick={() => openLabelModal(s)}>
                                            Print Label
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>

            {/* Label Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Shipping Label & Tracking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedShipment && (
                            <>
                                <Text fontWeight="bold" mb={2}>
                                    Tracking Number: {selectedShipment.trackingNumber}
                                </Text>
                                <Box
                                    as="img"
                                    src={selectedShipment.labelUrl}
                                    alt="Shipping Label"
                                    width="100%"
                                    borderRadius="md"
                                    mb={4}
                                />
                                <Text>
                                    Carrier: {selectedShipment.carrier} <br />
                                    Service: {selectedShipment.service}
                                </Text>
                            </>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}
