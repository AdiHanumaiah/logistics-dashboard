'use client';

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
    SimpleGrid,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import {
    PackageOpen,
    CheckCircle,
    MapPin,
    Clock,
    ListChecks,
} from "lucide-react";

export default function LogisticsIntroPage() {
    return (
        <Box bg={useColorModeValue("gray.50", "gray.800")} py={10}>
            <Container maxW={"7xl"}>
                {/* Hero Section */}
                <Flex
                    direction={{ base: "column", md: "row" }}
                    align="center"
                    justify="space-between"
                >
                    <VStack align="start" spacing={6} maxW="lg">
                        <Heading as="h1" size="2xl">
                            Simplify Your Shipment Tracking & Dispatch
                        </Heading>
                        <Text fontSize="lg" color="gray.600">
                            A powerful yet simple shipment dashboard for solo logistics teams
                            and dispatchers. Track, update, and visualize shipments effortlessly.
                        </Text>
                        <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                            <Button colorScheme="teal" size="lg">
                                Get Started Free
                            </Button>
                            <Button variant="outline" size="lg">
                                See How It Works
                            </Button>
                        </Stack>
                    </VStack>
                    <Image
                        src="/images/dashboard-preview.png"
                        alt="Shipment Dashboard Preview"
                        borderRadius="xl"
                        maxW={{ base: "100%", md: "50%" }}
                        mt={{ base: 8, md: 0 }}
                    />
                </Flex>

                {/* Why Section */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mt={20}>
                    {[
                        {
                            icon: PackageOpen,
                            title: "Designed for Small Teams",
                            desc: "Manage your shipments without the complexity of enterprise software.",
                        },
                        {
                            icon: ListChecks,
                            title: "Real-Time Status Updates",
                            desc: "Update shipment statuses and get instant insights on your deliveries.",
                        },
                        {
                            icon: Clock,
                            title: "$10/month Flat Rate",
                            desc: "Simple pricing with no surprises — just focus on your logistics.",
                        },
                    ].map((feature, idx) => (
                        <Stack key={idx} spacing={3} align="center" textAlign="center">
                            <Icon as={feature.icon} boxSize={10} color="teal.500" />
                            <Text fontSize="xl" fontWeight="bold">
                                {feature.title}
                            </Text>
                            <Text color="gray.600">{feature.desc}</Text>
                        </Stack>
                    ))}
                </SimpleGrid>

                {/* How It Works */}
                <Box mt={20} textAlign="center">
                    <Heading size="xl" mb={10}>
                        How It Works
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
                        {[
                            {
                                icon: PackageOpen,
                                title: "1. Add Shipments",
                                desc: "Input shipment details including destination, items, and delivery date.",
                            },
                            {
                                icon: CheckCircle,
                                title: "2. Update Status",
                                desc: "Mark shipments as Label Printed, In Transit, Delivered, or Exception.",
                            },
                            {
                                icon: MapPin,
                                title: "3. Visualize on Map",
                                desc: "See all shipments geographically to optimize routes and schedules.",
                            },
                            {
                                icon: ListChecks,
                                title: "4. Review History",
                                desc: "Search and filter completed shipments to analyze performance.",
                            },
                        ].map((step, idx) => (
                            <Stack key={idx} spacing={3} align="center">
                                <Icon as={step.icon} boxSize={8} color="teal.500" />
                                <Text fontWeight="bold">{step.title}</Text>
                                <Text color="gray.600">{step.desc}</Text>
                            </Stack>
                        ))}
                    </SimpleGrid>
                </Box>

                {/* Final CTA */}
                <Box textAlign="center" mt={20}>
                    <Heading size="lg">Ready to streamline your shipments?</Heading>
                    <Text color="gray.600" mt={2}>
                        Start free today — no credit card required.
                    </Text>
                    <Button colorScheme="teal" size="lg" mt={6}>
                        Get Started Free
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
