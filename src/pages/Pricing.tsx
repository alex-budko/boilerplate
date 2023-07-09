import { ReactNode } from 'react';
import { Box, Stack, HStack, Heading, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_live_51NPtpiJYg5O3ufDJs8bcAM7DqQpIDwgDxRwV2It0Am37MgS3o0y4syEsOsDE0p2ItIu4yEECOjiwaMhGrvyWjyNO00J3G5MYs1');

function PriceWrapper({ children, bgGradient }: { children: ReactNode, bgGradient: string }) {
  return (
    <Box mb={4} shadow="base" borderWidth="1px" alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')} borderRadius={'xl'} bgGradient={bgGradient}>
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
            <Text fontWeight="500" fontSize="2xl"> 5 BAI Tokens </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 4.99 </Text>
            </HStack>
            <Button mt={4} onClick={() => handleCheckout('prod_ODmh4Bu4QgPNTT')}>Subscribe</Button>
          </Box>
        </PriceWrapper>
        <PriceWrapper bgGradient="linear(to-r, blue.500, teal.500)">
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl"> 10 BAI Tokens </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 8.99 </Text>
            </HStack>
            <Button mt={4} onClick={() => handleCheckout('prod_ODmh4Bu4QgPNTT')}>Subscribe</Button>
          </Box>
        </PriceWrapper>
        <PriceWrapper bgGradient="linear(to-r, green.500, yellow.500)">
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl"> 15 BAI Tokens </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">$</Text>
              <Text fontSize="5xl" fontWeight="900"> 12.99 </Text>
            </HStack>
            <Button mt={4} onClick={() => handleCheckout('prod_ODmh4Bu4QgPNTT')}>Subscribe</Button>
          </Box>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}
