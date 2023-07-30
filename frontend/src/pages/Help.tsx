import {
  Box, Heading, Container, Text, Button, Stack, Link
} from '@chakra-ui/react';

export default function Help() {
  return (
    <Box minH='94vh' bgGradient="linear(to-r, black, gray)">
      <Container maxW={'3xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600} color='white' fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
            Need help?
            <br />
            <Text as={'span'} color={'purple.400'}> We're here to assist you </Text>
          </Heading>
          <Text color={'gray.500'}>
            Our dedicated support team is always ready to help you out. If you're having trouble with code generation, uploading code to GitHub, or need assistance with any other feature, don't hesitate to reach out to us. We're committed to providing you with a smooth, hassle-free experience.
          </Text>
          <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
            <Link href="mailto:xalex.budko@gmail.com" isExternal>
              <Button colorScheme={'green'} bg={'purple.400'} rounded={'full'} px={6} _hover={{ bg: 'purple.500', }}>
                Contact Support
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
