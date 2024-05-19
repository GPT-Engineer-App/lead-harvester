import { Container, Box, Typography, Paper } from '@mui/material';
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Fetched Leads
      </Typography>
      {leads.length > 0 ? (
        leads.map((lead, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Title: {lead.title}</Typography>
            <Typography>Description: {lead.description}</Typography>
            <Typography>Company: {lead.company}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No leads found.</Typography>
      )}
    </Container>
  );
};

export default Results;