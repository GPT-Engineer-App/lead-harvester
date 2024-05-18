import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const convertUsdToInr = (usd) => usd * 75; // Example conversion rate

const Results = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("/api/leads");
        const leadsWithConvertedOffer = response.data.map((lead) => ({
          ...lead,
          offer: lead.currency === "USD" ? convertUsdToInr(lead.offer) : lead.offer,
        }));
        setLeads(leadsWithConvertedOffer);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h2" size="xl" fontWeight="bold">Fetched Leads</Heading>
        {leads.length > 0 ? (
          leads.map((lead, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>Title: {lead.title}</Text>
              <Text>Description: {lead.description}</Text>
              <Text>Company: {lead.company}</Text>
              <Text>Offer: {lead.offer} INR</Text>
            </Box>
          ))
        ) : (
          <Text>No leads found.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Results;