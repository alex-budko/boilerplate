import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";

const questions = [
  {
    question: "How do I sign in?",
    answer:
      "You can sign in using your Github account. Just click on the 'Sign in with Github' button on the home page.",
  },
  {
    question: "What is a thorough prompt?",
    answer:
      "A thorough prompt is a detailed description of what you want the code to achieve. The more specific and detailed your prompt, the better the generated code will be.",
  },
  {
    question: "How do I export the code?",
    answer:
      "You can export the code by clicking on the 'Export' button. You can choose to directly push the code to a Github repository or download the files to your local machine.",
  },
];

export default function FAQ() {
  const color = useColorModeValue("gray.300", "white");
  const bgColor = useColorModeValue("gray.700", "gray.800");
  const hoverColor = useColorModeValue("gray.600", "gray.700");

  return (
    <VStack spacing={5} m="3" w="100%" align="start">
      <Box>
        <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
          Frequently Asked Questions
        </Heading>
      </Box>
      <Accordion allowToggle w="100%" colorScheme="gray">
        {questions.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <AccordionIcon color={color} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </VStack>
  );
}
