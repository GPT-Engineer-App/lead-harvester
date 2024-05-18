import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("/api/leads");
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <Container centerContent maxW="container.md" py={10} boxShadow="lg" p={10} bg="white" borderRadius="md">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold" color="teal.500" fontFamily="Roboto, sans-serif">Fetched Leads</Text>
        {leads.length > 0 ? (
          leads.map((lead, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%" boxShadow="sm">
              <Text fontSize="lg" color="gray.700">Title: {lead.title}</Text>
              <Text fontSize="md" color="gray.600">Description: {lead.description}</Text>
              <Text fontSize="md" color="gray.600">Company: {lead.company}</Text>
            </Box>
          ))
        ) : (
          <Text fontSize="lg" color="gray.600">No leads found.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Results;