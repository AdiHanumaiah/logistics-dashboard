'use client';

import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Text,
    Link
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function LoginPage() {
    return (
        <Box maxW="md" mx="auto" mt={20} p={6} boxShadow="md" borderRadius="md">
            <Heading mb={6} size="lg" textAlign="center">Log In</Heading>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="you@example.com" />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="••••••••" />
                </FormControl>
                <Button colorScheme="teal" width="full">Log In</Button>
                <Text fontSize="sm">
                    Don't have an account?{' '}
                    <Link as={NextLink} href="/auth/signup" color="teal.500">Sign up</Link>
                </Text>
            </VStack>
        </Box>
    );
}