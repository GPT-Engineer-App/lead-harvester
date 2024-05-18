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
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">Fetched Leads</Text>
        {leads.length > 0 ? (
          leads.map((lead, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>Name: {lead.name}</Text>
              <Text>Email: {lead.email}</Text>
              <Text>Company: {lead.company}</Text>
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