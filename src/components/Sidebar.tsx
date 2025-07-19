'use client';

import { Box, VStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Routes', href: '/routes' },
  { label: 'Drivers', href: '/drivers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Subscribe', href: '/subscribe' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      height="100vh"
      width="200px"
      bg="gray.800"
      color="white"
      padding="20px"
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