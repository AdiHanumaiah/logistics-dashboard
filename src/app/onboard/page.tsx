"use client";

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    Truck,
    ClipboardList,
    PackageOpen,
    CheckCircle2,
    MapPin,
} from "lucide-react";
import React from "react";

const steps = [
    {
        icon: ClipboardList,
        title: "Step 1: Create Your Shipment",
        description:
            "Enter sender and recipient addresses, package details, and choose your carrier and service level.",
    },
    {
        icon: PackageOpen,
        title: "Step 2: Generate Shipping Label",
        description:
            "Click 'Create Shipment' to generate a shipping label and tracking number instantly.",
    },
    {
        icon: Truck,
        title: "Step 3: Ship Your Package",
        description:
            "Print the label and hand your package over to the carrier for shipping.",
    },
    {
        icon: MapPin,
        title: "Step 4: Track in Real-Time",
        description:
            "Monitor your shipment status in the dashboard with live updates.",
    },
    {
        icon: CheckCircle2,
        title: "Step 5: Delivery Confirmed",
        description:
            "Receive confirmation once the shipment is delivered successfully.",
    },
];

export default function OnboardPage() {
    const bg = useColorModeValue("gray.50", "gray.800");
    const boxBg = useColorModeValue("white", "gray.700");

    return (
        <Box bg={bg} py={16}>
            <Container maxW="7xl" px={4}>
                <VStack spacing={10} textAlign="center" mb={12}>
                    <Heading size="2xl" fontWeight="extrabold">
                        How It Works
                    </Heading>
                    <Text fontSize="xl" maxW="3xl" color="gray.600" _dark={{ color: "gray.300" }}>
                        Follow these simple steps to create shipments, print labels, and track packages all in one place.
                    </Text>
                </VStack>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    {steps.map(({ icon: StepIcon, title, description }, i) => (
                        <Stack
                            key={i}
                            bg={boxBg}
                            rounded="xl"
                            p={8}
                            spacing={4}
                            boxShadow="lg"
                            _hover={{ boxShadow: "xl" }}
                            transition="box-shadow 0.3s ease"
                            position="relative"
                        >
                            <Flex
                                w={14}
                                h={14}
                                align="center"
                                justify="center"
                                rounded="full"
                                bg="teal.500"
                                color="white"
                                mb={4}
                                fontSize="3xl"
                            >
                                <Icon as={StepIcon} />
                            </Flex>
                            <Heading size="md" fontWeight="bold">
                                {title}
                            </Heading>
                            <Text fontSize="md" color="gray.600" _dark={{ color: "gray.300" }}>
                                {description}
                            </Text>
                            <Box
                                position="absolute"
                                top={2}
                                right={4}
                                bg="teal.400"
                                color="white"
                                px={3}
                                py={1}
                                fontSize="sm"
                                fontWeight="bold"
                                rounded="full"
                                userSelect="none"
                            >
                                {`#${i + 1}`}
                            </Box>
                        </Stack>
                    ))}
                </SimpleGrid>

                <Flex justify="center" mt={16}>
                    <Button
                        size="lg"
                        colorScheme="teal"
                        onClick={() => {
                            // Redirect to create shipment page or signup
                            window.location.href = "/create-shipment";
                        }}
                    >
                        Get Started
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
}
