import { useAuthUser } from "../store/authUser";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

const AdminDashboard = () => {
  const { user, logout } = useAuthUser();

  return (
    <Container>
      <Box textAlign="center" py={10}>
        <Heading>Welcome {user.user.first_name}!</Heading>
        <Text>You are logged in as an Admin.</Text>
        <Button mt={4} onClick={logout}>
          Logout
        </Button>
      </Box>
      <VStack spacing={4} align="stretch">
        <Link to="/admin/users">
          <Button width="100%">Manage Users</Button>
        </Link>
        <Link to="/admin/movies">
          <Button width="100%">Manage Movies</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default AdminDashboard;
