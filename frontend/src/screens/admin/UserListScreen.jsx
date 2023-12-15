import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, ListGroup } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <ListGroup>
          {users.map((user) => (
            <ListGroup.Item key={user._id}>
              <strong>Customer ID:</strong> {user._id}
              <br />
              <strong>Customer Name:</strong> {user.name}
              <br />
              <strong>Mail Id:</strong> {user.email}
              <br />
              <strong>Is Admin:</strong>{" "}
              {user.isAdmin ? (
                <FaCheck style={{ color: "green" }} />
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
              <br />
              <strong>Actions:</strong>
              {!user.isAdmin && (
                <>
                  <LinkContainer
                    to={`/admin/user/${user._id}/edit`}
                    style={{ marginRight: "10px" }}
                  >
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default UserListScreen;
