import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useGetUserDetailsQuery, useProfileMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserProfileScreen = () => {
  // State for form fields and modal
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // Fetch the user's details
  const { data: userDetails, isError, isLoading, error, refetch } = useGetUserDetailsQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });

  // Mutation for updating user details
  const [updateProfile, { isSuccess, isError: isUpdateError, error: updateError }] = useProfileMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userDetails) {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [userInfo, userDetails, navigate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await updateProfile({ id: userInfo.id, name, email, password }).unwrap();
      toast.success('Profile Updated Successfully!');
      handleClose();
      refetch();
    } catch (err) {
      toast.error(updateError?.data?.message || 'Could not update profile.');
    }
  };

  // Check if loading or error states are present
  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{error?.data?.message || error.message}</Message>;

  return (
    <>
      <Row>
        <Col md={9}>
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {userDetails?.name}</p>
          <p><strong>Email:</strong> {userDetails?.email}</p>
          <Button variant="primary" onClick={handleShow}>Edit Profile</Button>
        </Col>
      </Row>

      {/* Modal for editing user details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            {/* Form fields for name, email, password, and confirmPassword */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfileScreen;
