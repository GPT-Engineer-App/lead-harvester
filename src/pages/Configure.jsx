import { Box, Button, Container, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Configure = () => {
  const [minimumOffer, setMinimumOffer] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleMinimumOfferChange = (e) => setMinimumOffer(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/crawl", { domain, description, minimumOffer });
      navigate("/results");
    } catch (error) {
      console.error("Error submitting configuration:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <FormControl id="domain">
          <FormLabel>Target Domain</FormLabel>
          <Input type="text" value={domain} onChange={handleDomainChange} />
        </FormControl>
        <FormControl id="minimumOffer">
          <FormLabel>Set Minimum Offer (INR)</FormLabel>
          <Input type="number" value={minimumOffer} onChange={handleMinimumOfferChange} />
        </FormControl>
        <FormControl id="description">
          <FormLabel>Lead Description</FormLabel>
          <Input type="text" value={description} onChange={handleDescriptionChange} />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleSubmit}>Save and Fetch Leads</Button>
      </VStack>
    </Container>
  );
};

export default Configure;