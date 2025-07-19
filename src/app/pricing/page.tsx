'use client';

import { Box, Heading, Text, Button, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <Box p={10} maxW="5xl" mx="auto" textAlign="center">
            <Heading mb={4}>Choose Your Plan</Heading>
            <Text fontSize="lg" mb={10}>
                Access powerful logistics tracking and shipment monitoring.
            </Text>

            <HStack justify="center" spacing={10} flexWrap="wrap">
                <PlanCard
                    title="Free"
                    price="$0"
                    features={['Basic shipment viewer', 'Manual data entry', 'Limited map features']}
                    buttonText="Get Started"
                    href="/dashboard"
                />
                <PlanCard
                    title="Pro"
                    price="$19/month"
                    features={['Live shipment updates', 'Carrier tracking', 'Export tools', 'Priority support']}
                    buttonText="Subscribe"
                    href="/subscribe"
                />
            </HStack>
        </Box>
    );
}

function PlanCard({
    title,
    price,
    features,
    buttonText,
    href,
}: {
    title: string;
    price: string;
    features: string[];
    buttonText: string;
    href: string;
}) {
    const bg = useColorModeValue('white', 'gray.800');
    return (
        <Box
            p={6}
            w="300px"
            borderWidth="1px"
            borderRadius="2xl"
            boxShadow="lg"
            bg={bg}
        >
            <Heading size="md" mb={2}>
                {title}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                {price}
            </Text>
            <VStack align="start" spacing={2} mb={6}>
                {features.map((feature, idx) => (
                    <Text key={idx}>• {feature}</Text>
                ))}
            </VStack>
            <Link href={href}>
                <Button colorScheme="teal" w="full">
                    {buttonText}
                </Button>
            </Link>
        </Box>
    );
}
