'use client';

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorMode,
    useColorModeValue,
    Avatar,
    Link as ChakraLink,
    Text,
} from '@chakra-ui/react';

import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import React from 'react';

const Links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Upload Docs', href: '/upload' },
    { name: 'Settings', href: '/settings' },
];

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    // Move useColorModeValue calls to the top level
    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const hoverBg = useColorModeValue('teal.200', 'teal.700');

    return (
        <Box
            bg={bgColor}
            px={4}
            boxShadow="md"
            position="sticky"
            top="0"
            zIndex="100"
        >
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Logo + App Name */}
                <HStack spacing={3} alignItems="center">
                    <Box
                        bg="teal.500"
                        w={8}
                        h={8}
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                        fontSize="lg"
                        userSelect="none"
                    >
                        L
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" userSelect="none" color={textColor}>
                        LogiTrack
                    </Text>
                </HStack>

                {/* Navigation Links */}
                <HStack spacing={6} display={{ base: 'none', md: 'flex' }}>
                    {Links.map(({ name, href }) => (
                        <ChakraLink
                            key={name}
                            as={NextLink}
                            href={href}
                            px={2}
                            py={1}
                            rounded="md"
                            _hover={{
                                textDecoration: 'none',
                                bg: hoverBg,
                            }}
                            fontWeight="medium"
                        >
                            {name}
                        </ChakraLink>
                    ))}
                </HStack>

                {/* Right side: Light/Dark toggle + User menu */}
                <Flex alignItems="center" gap={4}>
                    <IconButton
                        size="md"
                        fontSize="lg"
                        aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
                        variant="ghost"
                        color="current"
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />

                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={0}
                        >
                            <Avatar
                                size="sm"
                                src="https://bit.ly/broken-link" // replace with user's avatar URL or placeholder
                                name="User Avatar"
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={NextLink} href="/profile">
                                Profile
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => alert('Logging out... (implement logic)')}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
