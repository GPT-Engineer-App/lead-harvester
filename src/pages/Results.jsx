import { Box, Button, Container, Heading, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const Results = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h2" size="xl">Results</Heading>
        <Button onClick={fetchLeads} colorScheme="teal" size="lg" isLoading={loading}>Fetch Leads</Button>
        {leads.length > 0 && (
          <Box width="100%">
            {leads.map((lead, index) => (
              <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text><strong>Name:</strong> {lead.name}</Text>
                <Text><strong>Email:</strong> {lead.email}</Text>
                <Text><strong>Company:</strong> {lead.company}</Text>
              </Box>
            ))}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Results;