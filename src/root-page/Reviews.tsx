import { Box, HStack, Progress } from "@chakra-ui/react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Reviews() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const reviews = [
    { id: 1, name: "John Doe", content: "Review 1" },
    { id: 2, name: "Jane Smith", content: "Review 2" },
    { id: 3, name: "Bob Johnson", content: "Review 3" },
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
              w='10vw'
              h='10vw'
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
