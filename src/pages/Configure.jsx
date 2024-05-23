import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Switch, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Configure = () => {
  const [minOffer, setMinOffer] = useState("");
  const [filterRecent, setFilterRecent] = useState(false);
  const [maxPagination, setMaxPagination] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const [fetchAllListings, setFetchAllListings] = useState(false);

  const navigate = useNavigate();

  const handleMinOfferChange = (e) => setMinOffer(e.target.value);
  const handleFilterRecentChange = (e) => setFilterRecent(e.target.checked);
  const handleMaxPaginationChange = (e) => setMaxPagination(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleFetchAllListingsChange = (e) => setFetchAllListings(e.target.checked);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/crawl", { domain, description, minOffer, filterRecent, maxPagination, fetchAllListings });
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
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="fetch-all-listings" mb="0">
            Fetch All Listings
          </FormLabel>
          <Switch id="fetch-all-listings" isChecked={fetchAllListings} onChange={handleFetchAllListingsChange} />
        </FormControl>
        <FormControl id="minOffer" isDisabled={fetchAllListings}>
          <FormLabel>Minimum Offer</FormLabel>
          <Input type="number" value={minOffer} onChange={handleMinOfferChange} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="filter-recent" mb="0">
            Filter by Most Recent Postings
          </FormLabel>
          <Switch id="filter-recent" isChecked={filterRecent} onChange={handleFilterRecentChange} />
        </FormControl>
        <FormControl id="maxPagination">
          <FormLabel>Max Pagination to Crawl</FormLabel>
          <Input type="number" value={maxPagination} onChange={handleMaxPaginationChange} />
        </FormControl>
        <FormControl id="description" isDisabled={fetchAllListings}>
          <FormLabel>Lead Description</FormLabel>
          <Input type="text" value={description} onChange={handleDescriptionChange} />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleSubmit}>Save and Fetch Leads</Button>
      </VStack>
    </Container>
  );
};

export default Configure;