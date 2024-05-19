import { Box, Button, Container, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Configure = () => {
  const [minOffer, setMinOffer] = useState("");
  const [maxPagination, setMaxPagination] = useState("");
  const [filterRecent, setFilterRecent] = useState(false);
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleMinOfferChange = (e) => setMinOffer(e.target.value);
  const handleMaxPaginationChange = (e) => setMaxPagination(e.target.value);
  const handleFilterRecentChange = () => setFilterRecent(!filterRecent);
  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/crawl", { domain, description, minOffer, maxPagination, filterRecent });
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
        <FormControl id="minOffer">
          <FormLabel>Minimum Offer</FormLabel>
          <Input type="number" value={minOffer} onChange={handleMinOfferChange} />
        </FormControl>
        <FormControl id="maxPagination">
          <FormLabel>Max Pagination</FormLabel>
          <Input type="number" value={maxPagination} onChange={handleMaxPaginationChange} />
        </FormControl>
        <FormControl id="filterRecent">
          <FormLabel>Filter Recent</FormLabel>
          <Button onClick={handleFilterRecentChange} colorScheme={filterRecent ? "teal" : "gray"}>
            {filterRecent ? "Enabled" : "Disabled"}
          </Button>
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