import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Configure = () => {
  const [threshold, setThreshold] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleThresholdChange = (e) => setThreshold(e.target.value);
  const handleDomainChange = (e) => setDomain(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/crawl", { domain, description, threshold });
      navigate("/results");
    } catch (error) {
      console.error("Error submitting configuration:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configure Lead Generation
        </Typography>
        <TextField
          fullWidth
          label="Target Domain"
          value={domain}
          onChange={handleDomainChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Set Lead Threshold"
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Lead Description"
          value={description}
          onChange={handleDescriptionChange}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save and Fetch Leads
        </Button>
      </Box>
    </Container>
  );
};

export default Configure;