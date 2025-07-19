'use client';

import Link from 'next/link';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={10} textAlign="center">
      <Heading mb={4}>Logistics Optimization Platform</Heading>
      <Text fontSize="lg" mb={6}>
        Streamline your local deliveries with route optimization and analytics.
      </Text>
      <Button as={Link} href="/dashboard" colorScheme="teal" size="lg">
        Go to Dashboard
      </Button>
    </Box>
  );
}
