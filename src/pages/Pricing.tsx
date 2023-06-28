import { ReactNode } from 'react';
import {
  Box, Stack, HStack, Heading, Text, VStack,
  useColorModeValue,
} from '@chakra-ui/react';

function PriceWrapper({ children, bgGradient }: { children: ReactNode, bgGradient: string }) {
  return (
    <Box mb={4} shadow="base" borderWidth="1px" alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')} borderRadius={'xl'} bgGradient={bgGradient}>
      {children}
    </Box>
  );
}

export default function Pricing() {
  return (
    <Box bgGradient="linear(to-r, black, gray)" minH='94vh' py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl"> Plans that fit your need </Heading>
        <Text fontSize="lg" color={'gray.500'}> Start with 14-day free trial. No credit card needed. Cancel at anytime. </Text>
      </VStack>
      <Stack direction={{ base: 'column', md: 'row' }} textAlign="center" justify="center" spacing={{ base: 4, lg: 10 }} py={10}>
        <PriceWrapper bgGradient="linear(to-r, red.500, orange.500)">
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl"> Hobby </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 17 </Text>
              <Text fontSize="3xl" color="black.500"> /month </Text>
            </HStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper bgGradient="linear(to-r, blue.500, teal.500)">
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl"> Pro </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 39 </Text>
              <Text fontSize="3xl" color="black.500"> /month </Text>
            </HStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper bgGradient="linear(to-r, green.500, yellow.500)">
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl"> Business </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 99 </Text>
              <Text fontSize="3xl" color="black.500"> /month </Text>
            </HStack>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
