import { Box, Button, Container, FormControl, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Config = () => {
  const [threshold, setThreshold] = useState("");

  const handleThresholdChange = (e) => setThreshold(e.target.value);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h2" size="xl">Configuration</Heading>
        <FormControl id="threshold">
          <FormLabel>Threshold</FormLabel>
          <Input type="number" value={threshold} onChange={handleThresholdChange} />
        </FormControl>
        <Button as={Link} to="/results" colorScheme="teal" size="lg">Save and Continue</Button>
      </VStack>
    </Container>
  );
};

export default Config;