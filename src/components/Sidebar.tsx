'use client';

import { Box, VStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Create Shipment', href: '/shipments/create' },
  { label: 'Shipment History', href: '/history' },
  { label: 'Routes', href: '/routes' },
  { label: 'Drivers', href: '/drivers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Subscribe', href: '/subscribe' },
  { label: 'Login', href: '/auth/login' },
  { label: 'Sign Up', href: '/auth/signup' },
  { label: 'Landing Page', href: '/intro' },
  { label: 'Onboard Page', href: '/onboard' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      pos="fixed"
      top="60px" // Navbar height
      left="0"
      height="calc(100vh - 60px)"
      width="200px"
      bg="gray.800"
      color="white"
      padding="20px"
      boxShadow="2px 0 5px rgba(0,0,0,0.3)"
      zIndex={20}
    >
      <VStack align="start" spacing={6}>
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              as={NextLink}
              key={href}
              href={href}
              fontWeight={isActive ? 'bold' : 'normal'}
              color={isActive ? 'teal.300' : 'white'}
              _hover={{ textDecoration: 'none', color: 'teal.400' }}
              width="100%"
            >
              <Text>{label}</Text>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
}
