'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ChakraProvider>
          <Sidebar />
          <main style={{ marginLeft: 200, padding: 20 }}>{children}</main>
        </ChakraProvider>
      </body>
    </html>
  );
}
