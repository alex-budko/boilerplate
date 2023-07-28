import {
    Box,
    Center,
    Text,
    Stack,
    useColorModeValue,
    Wrap,
    WrapItem
  } from "@chakra-ui/react";
  
  const cards = [
    {
      title: 'Sign In With GitHub',
      description: 'To get started, sign in with your GitHub account. This allows us to generate and push code directly to your repositories.',
      imageUrl: 'https://media3.giphy.com/media/du3J3cXyzhj75IOgvA/200.webp?cid=ecf05e47u8cohq41l0xdrrt3mxs70th0x44rf71ogeecndt1&ep=v1_gifs_search&rid=200.webp&ct=g',
    },
    {
      title: 'Type a Thorough Prompt',
      description: 'Next, type in a thorough prompt that describes the code you want. The more specific you are, the better we can generate code that fits your needs.',
      imageUrl: 'https://media3.giphy.com/media/l2Je3ktsieOfOGa1G/100.webp?cid=ecf05e47h69i65buqrozaqqce9ly32gu3hnzfnfxs34zkotw&ep=v1_gifs_search&rid=100.webp&ct=g',
    },
    {
      title: 'Export the Code',
      description: 'Finally, click the button to export the code. You can choose to push it directly to your GitHub repository or download the files to your local machine.',
      imageUrl: 'https://media3.giphy.com/media/4EFt4UAegpqTy3nVce/200w.webp?cid=ecf05e47qok1dt7zhyrk8llnnr9xuq32goilwrs8d9391ll2&ep=v1_gifs_search&rid=200w.webp&ct=g',
    },
  ];
  
  export default function HowItWorks() {
        const color = useColorModeValue('gray.700', 'white');
        const bg = useColorModeValue('white', 'gray.900');
      
        return (
          <Center>
            <Wrap spacing={10} m='3'>
              {cards.map((card, index) => (
                <Center py={6} key={index}>
                  <Box
                    w='30vw'
                    h='70vh'
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
                      <Text
                        fontWeight={'800'}
                        color={color}
                        fontSize={'2xl'}
                        fontFamily={'body'}
                      >
                        {card.title}
                      </Text>
                      <Text color={'gray.500'}>
                        {card.description}
                      </Text>
                    </Stack>
                  </Box>
                </Center>
              ))}
            </Wrap>
          </Center>
        );
      }