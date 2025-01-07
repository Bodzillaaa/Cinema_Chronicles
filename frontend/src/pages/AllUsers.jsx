import { Container, Text, Table, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");

        setUsers(response.data.content);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/user/${id}`);
      console.log("User deleted successfully");
      toast.success("User deleted successfully");

      setUsers(users.filter((user) => user.id !== id));
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container p={4}>
      <Text
        fontWeight={"bold"}
        fontSize={{ base: "xl", md: "3xl" }}
        my={4}
        textAlign={"center"}
      >
        Manage Users
      </Text>
      <Table.ScrollArea
        borderWidth="1px"
        maxW={{ base: "xl", md: "3xl" }}
        overflowX={"auto"}
        mx={"auto"}
      >
        <Table.Root p={4} variant={"outline"} mt={4} borderWidth="1px">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>First_name</Table.ColumnHeader>
              <Table.ColumnHeader>last_name</Table.ColumnHeader>
              <Table.ColumnHeader>Date of Birth</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.first_name}</Table.Cell>
                <Table.Cell>{user.last_name}</Table.Cell>
                <Table.Cell>{user.dob}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  {user.role !== "admin" ? (
                    <Button bg="red.500" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                  ) : null}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Container>
  );
};

export default AllUsers;
