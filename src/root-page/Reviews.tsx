import { Box, HStack, Progress } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Reviews() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const reviews = [
    { id: 1, name: "John Doe", content: "Love it" },
    { id: 2, name: "Jane Smith", content: "Love it" },
    { id: 3, name: "Bob Johnson", content: "Love it" },
  ];

  return (
    <HStack position="relative" height="100vh" overflowX="hidden">
      <HStack as="ul" ref={ref} p={8} listStyleType="none" spacing={8}>
        {reviews.map((review) => (
          <motion.li
            key={review.id}
            initial={{ x: "-30vw" }}
            animate={{ x: "50vw" }}
            transition={
              {
                repeat: Infinity,
                duration: 5,
                ease: "linear",
                delay: 0.4,
              } as any
            }
          >
            <Box
              mb={4}
              p={4}
              borderWidth={1}
              borderColor="gray.200"
              borderRadius="md"
              w='15vw'
              h='15vw'
            >
              <strong>{review.name}</strong>
              <p>{review.content}</p>
            </Box>
          </motion.li>
        ))}
      </HStack>
    </HStack>
  );
}
