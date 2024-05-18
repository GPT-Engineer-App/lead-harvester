import { Box, Button, Container, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Configure = () => {
  const [threshold, setThreshold] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleThresholdChange = (e) => setThreshold(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/crawl", { domain, description, threshold });
      navigate("/results");
    } catch (error) {
      console.error("Error submitting configuration:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10} boxShadow="lg" p={10} bg="white" borderRadius="md">
      <VStack spacing={4} width="100%">
        <FormControl id="domain">
          <FormLabel fontSize="lg" color="teal.500" fontFamily="Roboto, sans-serif">Target Domain</FormLabel>
          <Input type="text" value={domain} onChange={handleDomainChange} />
        </FormControl>
        <FormControl id="threshold">
          <FormLabel fontSize="lg" color="teal.500" fontFamily="Roboto, sans-serif">Set Lead Threshold</FormLabel>
          <Input type="number" value={threshold} onChange={handleThresholdChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel fontSize="lg" color="teal.500" fontFamily="Roboto, sans-serif">Lead Description</FormLabel>
          <Input type="text" value={description} onChange={handleDescriptionChange} />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleSubmit} boxShadow="md">Save and Fetch Leads</Button>
      </VStack>
    </Container>
  );
};

export default Configure;