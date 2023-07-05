import { Center, Heading, } from "@chakra-ui/react";

const HeadingComponent = () => (
  <Center>
    <Heading fontSize={"3xl"} top={"-2"} position='fixed' fontWeight="bold" textShadow="1px 1px black" zIndex={2000} rounded={'3xl'}>
      Boilerplate.AI
    </Heading>
  </Center>
);

export default HeadingComponent;
