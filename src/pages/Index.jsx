import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to LeadGen</Heading>
        <Text fontSize="lg">Generate leads effortlessly with our powerful tool.</Text>
        <Button as={Link} to="/config" colorScheme="teal" size="lg">Get Started</Button>
      </VStack>
    </Container>
  );
};

export default Index;