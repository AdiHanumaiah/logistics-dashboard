'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function SubscribePage() {
    const router = useRouter();

    const handleSubscribe = () => {
        // TODO: Replace with your Stripe checkout logic
        alert('Redirecting to Stripe checkout...');
        // router.push('/api/stripe/checkout'); // Example endpoint
    };

    return (
        <Box padding={6}>
            <Heading size="lg" mb={4}>Subscribe to Logistics OS</Heading>
            <Text mb={6}>Unlock full access with a monthly subscription.</Text>
            <Button colorScheme="teal" onClick={handleSubscribe}>
                Subscribe Now
            </Button>
        </Box>
    );
}
