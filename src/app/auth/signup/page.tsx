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

export default function SignupPage() {
    return (
        <Box maxW="md" mx="auto" mt={20} p={6} boxShadow="md" borderRadius="md">
            <Heading mb={6} size="lg" textAlign="center">Create Account</Heading>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input type="text" placeholder="John Doe" />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="you@example.com" />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="••••••••" />
                </FormControl>
                <Button colorScheme="teal" width="full">Create Account</Button>
                <Text fontSize="sm">
                    Already have an account?{' '}
                    <Link as={NextLink} href="/auth/login" color="teal.500">Log in</Link>
                </Text>
            </VStack>
        </Box>
    );
}