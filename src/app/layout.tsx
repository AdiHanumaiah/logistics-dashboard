'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-o9N1j7kSMNVpLZ3eTnSxw2SgpehKjv9gQTY5mQ+S+Og="
          crossOrigin=""
        />
      </head>
      <body style={{ margin: 0 }}>
        <ChakraProvider>
          <Sidebar />
          <main style={{ marginLeft: 200, padding: 20 }}>{children}</main>
        </ChakraProvider>
      </body>
    </html>
  );
}