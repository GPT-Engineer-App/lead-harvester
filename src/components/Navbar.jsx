import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="container.md" mx="auto" align="center">
        <Text fontSize="xl" color="white" fontWeight="bold">LeadGen</Text>
        <Spacer />
        <Link as={RouterLink} to="/" color="white" mx={2}>Home</Link>
        <Link as={RouterLink} to="/config" color="white" mx={2}>Config</Link>
        <Link as={RouterLink} to="/results" color="white" mx={2}>Results</Link>
      </Flex>
    </Box>
  );
};

export default Navbar;