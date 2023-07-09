import {
  Box, Heading, Container, Text, Button, Stack, Link
} from '@chakra-ui/react';

export default function Help() {
  return (
    <Box minH='94vh' bgGradient="linear(to-r, black, gray)">
      <Container maxW={'3xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
            Need help?
            <br />
            <Text as={'span'} color={'green.400'}> We're here to assist you </Text>
          </Heading>
          <Text color={'gray.500'}>
            Our dedicated support team is always ready to help you out. Feel free to reach out to us if you have any queries or issues.
          </Text>
          <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
            <Link href="mailto:xalex.budko@gmail.com" isExternal>
              <Button colorScheme={'green'} bg={'green.400'} rounded={'full'} px={6} _hover={{ bg: 'green.500', }}>
                Contact
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
