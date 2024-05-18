import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Configure from "./pages/Configure.jsx";
import Results from "./pages/Results.jsx";
import Navbar from "./components/Navbar.jsx";
import { Box, Container, Flex, Heading, Text, VStack, Button } from "@chakra-ui/react";

function App() {
  return (
    <Box bg="gray.100" minH="100vh">
      <Router>
        <Navbar />
        <Container maxW="container.xl" py={4}>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route exact path="/configure" element={<Configure />} />
            <Route exact path="/results" element={<Results />} />
          </Routes>
        </Container>
      </Router>
    </Box>
  );
}

export default App;