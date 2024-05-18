import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" boxShadow="lg" p={10} bg="white" borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="teal.500" fontFamily="Roboto, sans-serif">Welcome to LeadGen</Text>
        <Text fontSize="xl" color="gray.600">Your ultimate tool for generating leads efficiently.</Text>
        <Button as={Link} to="/configure" colorScheme="teal" size="lg" boxShadow="md">Get Started</Button>
      </VStack>
    </Container>
  );
};

export default Index;