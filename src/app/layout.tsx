'use client';

import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const NAVBAR_HEIGHT = 60; // Adjust if your Navbar height changes

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, height: '100vh' }}>
        <ChakraProvider>
          <Navbar />

          {/* Flex container with margin-top for navbar height */}
          <div
            style={{
              display: 'flex',
              height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
              marginTop: NAVBAR_HEIGHT,
              overflow: 'hidden',
            }}
          >
            <Sidebar />

            <main
              style={{
                marginLeft: 200, // sidebar width
                flexGrow: 1,
                height: '100%',
                overflowY: 'auto',
                padding: 20,
                backgroundColor: 'var(--chakra-colors-white)',
              }}
            >
              {children}
            </main>
          </div>
        </ChakraProvider>
      </body>
    </html>
  );
}
