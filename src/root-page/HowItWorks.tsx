import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Container,
    HStack
  } from "@chakra-ui/react";
  
  const cards = [
    {
      title: 'Sign In With GitHub',
      description: 'To get started, sign in with your GitHub account. This allows us to generate and push code directly to your repositories.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Type a Thorough Prompt',
      description: 'Next, type in a thorough prompt that describes the code you want. The more specific you are, the better we can generate code that fits your needs.',
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      title: 'Export the Code',
      description: 'Finally, click the button to export the code. You can choose to push it directly to your GitHub repository or download the files to your local machine.',
      imageUrl: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?ixid=MXwxMjA3fDB8MHxwaG90by1wYWgelc1fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];
  
  export default function HowItWorks() {
        const color = useColorModeValue('gray.700', 'white');
        const bg = useColorModeValue('white', 'gray.900');
      
        return (
          <Center>
            <HStack spacing={10} m='3'>
              {cards.map((card, index) => (
                <Center py={6} key={index}>
                  <Box
                    bg={bg}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                  >
                    <Box
                      h={'210px'}
                      bg={'gray.100'}
                      mt={-6}
                      mx={-6}
                      mb={6}
                      pos={'relative'}
                    >
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                    <Stack>
                      <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}
                      >
                        Step {index + 1}
                      </Text>
                      <Heading
                        color={color}
                        fontSize={'2xl'}
                        fontFamily={'body'}
                      >
                        {card.title}
                      </Heading>
                      <Text color={'gray.500'}>
                        {card.description}
                      </Text>
                    </Stack>
                  </Box>
                </Center>
              ))}
            </HStack>
          </Center>
        );
      }