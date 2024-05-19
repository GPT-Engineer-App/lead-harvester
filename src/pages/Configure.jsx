import { Box, Button, Container, FormControl, InputLabel, Input, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Configure = () => {
  const [threshold, setThreshold] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Configure Lead Generation</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="domain">Target Domain</InputLabel>
        <Input id="domain" type="text" value={domain} onChange={handleDomainChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="threshold">Set Lead Threshold</InputLabel>
        <Input id="threshold" type="number" value={threshold} onChange={handleThresholdChange} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="description">Lead Description</InputLabel>
        <Input id="description" type="text" value={description} onChange={handleDescriptionChange} />
      </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
        Save and Fetch Leads
      </Button>
    </Container>
  );
};

export default Configure;