import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="white" p={4} boxShadow="md">
      <Flex align="center">
        <Text fontSize="2xl" fontWeight="bold" color="teal.500" fontFamily="Roboto, sans-serif">LeadGen</Text>
        <Spacer />
        <Link as={RouterLink} to="/" color="teal.500" mx={2} fontSize="lg">Home</Link>
        <Link as={RouterLink} to="/configure" color="teal.500" mx={2} fontSize="lg">Configure</Link>
        <Link as={RouterLink} to="/results" color="teal.500" mx={2} fontSize="lg">Results</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;