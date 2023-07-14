import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_live_51NPtpiJYg5O3ufDJs8bcAM7DqQpIDwgDxRwV2It0Am37MgS3o0y4syEsOsDE0p2ItIu4yEECOjiwaMhGrvyWjyNO00J3G5MYs1');

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

const handleCheckout = async (priceId: string) => {
  const stripe = await stripePromise;

  if (!stripe) {
    console.error('Failed to initialize Stripe');
    return;
  }

  const {error} = await stripe.redirectToCheckout({
    lineItems: [{price: priceId, quantity: 1}],
    mode: 'subscription',
    successUrl: 'https://your-website.com/success',
    cancelUrl: 'https://your-website.com/cancel',
  });

  if (error) {
    console.warn('Error:', error);
  }
};

export default function ThreeTierPricing() {
  return (
    <Box bgGradient="linear(to-r, black, gray)" minH='94vh' py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box bgColor={'white'} py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Hobby
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                79
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /tokens
              </Text>
            </HStack>
            <Button mt={4} bgColor={'blue.300'} onClick={() => handleCheckout('price_1NRL83JYg5O3ufDJE9wJr9iq')}>Purchase</Button>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box  bgColor={'white'} py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Growth
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  149
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
              <Button mt={4} bgColor={'whatsapp.600'} onClick={() => handleCheckout('price_1NRL83JYg5O3ufDJE9wJr9iq')}>Purchase</Button>
            </Box>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box  bgColor={'white'} py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Scale
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                349
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /month
              </Text>
            </HStack>
            <Button mt={4} bgColor={'yellow.400'} onClick={() => handleCheckout('price_1NRL83JYg5O3ufDJE9wJr9iq')}>Purchase</Button>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
