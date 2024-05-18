import { Container, Text, VStack, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="white" boxShadow="lg" borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="gray.800">Welcome to LeadGen</Text>
        <Text fontSize="xl" color="gray.600">Your ultimate tool for generating leads efficiently.</Text>
        <Button as={Link} to="/configure" colorScheme="blue" size="lg">Get Started</Button>
      </VStack>
    </Container>
  );
};

export default Index;