import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          Welcome to LeadGen
        </Typography>
        <Typography variant="h5" gutterBottom>
          Your ultimate tool for generating leads efficiently.
        </Typography>
        <Button
          component={Link}
          to="/configure"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
        >
          Get Started Now
        </Button>
      </Box>
    </Container>
  )
};

export default Index;