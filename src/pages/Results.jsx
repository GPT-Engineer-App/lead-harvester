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
    <Container centerContent maxW="container.md" py={10} bg="white" boxShadow="lg" borderRadius="md">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">Fetched Leads</Text>
        {leads.length > 0 ? (
          leads.map((lead, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%" bg="gray.50">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">Title: {lead.title}</Text>
              <Text color="gray.600">Description: {lead.description}</Text>
              <Text color="gray.600">Company: {lead.company}</Text>
              <Text color="gray.600">Offer: ₹{lead.offer}</Text>
            </Box>
          ))
        ) : (
          <Text color="gray.600">No leads found.</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Results;