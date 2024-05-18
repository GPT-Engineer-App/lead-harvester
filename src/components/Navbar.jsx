import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="white" p={4} boxShadow="md">
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color="blue.500">LeadGen</Text>
        <Spacer />
        <Link as={RouterLink} to="/" color="gray.800" mx={2}>Home</Link>
        <Link as={RouterLink} to="/configure" color="gray.800" mx={2}>Configure</Link>
        <Link as={RouterLink} to="/results" color="gray.800" mx={2}>Results</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;