import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center">
        <Text fontSize="xl" fontWeight="bold" color="white">LeadHarvester</Text>
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mx={2}>Home</Link>
        <Link as={RouterLink} to="/configure" color="white" mx={2}>Configure</Link>
        <Link as={RouterLink} to="/results" color="white" mx={2}>Results</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;