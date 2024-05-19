import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <Typography variant="h4" gutterBottom>
        Configure Lead Generation
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Target Domain"
          variant="outlined"
          margin="normal"
          value={domain}
          onChange={handleDomainChange}
        />
        <TextField
          fullWidth
          label="Set Lead Threshold"
          variant="outlined"
          margin="normal"
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
        />
        <TextField
          fullWidth
          label="Lead Description"
          variant="outlined"
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Save and Fetch Leads
        </Button>
      </Box>
    </Container>
  );
};

export default Configure;