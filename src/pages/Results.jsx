import { Box, Container, Typography, Card, CardContent } from "@mui/material";
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Fetched Leads</Typography>
      {leads.length > 0 ? (
        leads.map((lead, index) => (
          <Card key={index} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">Title: {lead.title}</Typography>
              <Typography>Description: {lead.description}</Typography>
              <Typography>Company: {lead.company}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No leads found.</Typography>
      )}
    </Container>
  );
};

export default Results;