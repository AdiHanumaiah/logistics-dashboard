'use client';

import {
    Box,
    Button,
    Card,
    CardBody,
    Heading,
    List,
    ListItem,
    SimpleGrid,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function PricingPage() {
    return (
        <Box p={10} maxW="6xl" mx="auto">
            <Heading mb={6}>Pricing</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={12}>
                {/* Free Plan */}
                <Card bg="gray.50" shadow="md">
                    <CardBody>
                        <Heading size="md">Free Plan</Heading>
                        <Text mt={2}>For individuals or small use cases</Text>
                        <List spacing={3} mt={4} fontSize="sm">
                            <ListItem><CheckIcon color="green.500" mr={2} /> Live Shipment Tracking</ListItem>
                            <ListItem><CheckIcon color="gray.400" mr={2} /> Route Optimization</ListItem>
                            <ListItem><CheckIcon color="gray.400" mr={2} /> CSV Export</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> Shipment History</ListItem>
                            <ListItem><CheckIcon color="gray.400" mr={2} /> Realtime Notifications</ListItem>
                            <ListItem><CheckIcon color="gray.400" mr={2} /> Team Support</ListItem>
                        </List>
                        <Button
                            colorScheme="teal"
                            size="lg"
                            mt={6}
                            as={NextLink}
                            href="/auth/signup">
                            Continue for Free
                        </Button>
                    </CardBody>
                </Card>

                {/* Pro Plan */}
                <Card bg="white" shadow="xl">
                    <CardBody>
                        <Heading size="md">Pro Plan</Heading>
                        <Text mt={2}>For growing teams and businesses</Text>
                        <List spacing={3} mt={4} fontSize="sm">
                            <ListItem><CheckIcon color="green.500" mr={2} /> Live Shipment Tracking</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> Route Optimization</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> CSV Export</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> Shipment History</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> Realtime Notifications</ListItem>
                            <ListItem><CheckIcon color="green.500" mr={2} /> Team Support</ListItem>
                        </List>
                        <Button mt={6} colorScheme="teal">
                            Subscribe - $29/mo
                        </Button>
                    </CardBody>
                </Card>
            </SimpleGrid>

            <Divider mb={10} />

            {/* Feature Comparison Table */}
            <Heading size="md" mb={4}>Compare Plans</Heading>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th>Feature</Th>
                        <Th>Free</Th>
                        <Th>Pro</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr><Td>Live Shipment Tracking</Td><Td>✔️</Td><Td>✔️</Td></Tr>
                    <Tr><Td>Route Optimization</Td><Td>❌</Td><Td>✔️</Td></Tr>
                    <Tr><Td>Export to CSV</Td><Td>❌</Td><Td>✔️</Td></Tr>
                    <Tr><Td>Shipment History</Td><Td>✔️</Td><Td>✔️</Td></Tr>
                    <Tr><Td>Realtime Notifications</Td><Td>❌</Td><Td>✔️</Td></Tr>
                    <Tr><Td>Team Support</Td><Td>❌</Td><Td>✔️</Td></Tr>
                </Tbody>
            </Table>

            <Divider my={10} />

            {/* FAQ Section */}
            <Heading size="md" mb={4}>Frequently Asked Questions</Heading>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">Can I cancel anytime?</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, your subscription is month-to-month. Cancel anytime from your dashboard.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">Is there a free trial?</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        Yes, we offer a 7-day free trial for the Pro plan.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <Box flex="1" textAlign="left">What happens if I go over my limits?</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        You’ll get a notice in your dashboard with upgrade options.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
}