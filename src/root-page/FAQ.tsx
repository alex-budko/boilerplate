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
  const color = useColorModeValue("gray.700", "white");

  return (
    <HStack spacing={10} m="3">
      <Box>
        <Heading color={color} fontSize={"2xl"} fontFamily={"body"}>
          Frequently Asked Questions
        </Heading>
      </Box>
      <Accordion allowToggle w="50%">
        {questions.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </HStack>
  );
}
