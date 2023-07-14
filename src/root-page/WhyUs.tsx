import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    SimpleGrid,
    Container,
    HStack,
  } from "@chakra-ui/react";
  
  const cards = [
    {
      title: "Speed",
      description:
        "Our tool helps you to generate code rapidly. It's significantly faster than building your app from scratch, saving you precious time and effort.",
      imageUrl:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Ease of Use",
      description:
        "Our intuitive interface makes generating code easy. Just type in a thorough prompt, and we'll do the rest. You don't need to be an expert to use our tool.",
      imageUrl:
        "https://images.unsplash.com/photo-1529468612040-c93d7a7133f3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWgelc1fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Affordable",
      description:
        "Compared to the costs of software development, our tool is a cost-effective solution. It helps you cut down on your development expenses without compromising on quality.",
      imageUrl:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?ixid=MXwxMjA3fDB8MHxwaG90by1wYWgelc1fHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];
  
  export default function WhyUs() {
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
                    Benefit {index + 1}
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