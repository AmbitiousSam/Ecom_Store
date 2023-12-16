import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert, Modal } from 'react-bootstrap';
import { useGetUserDetailsQuery, useProfileMutation } from '../slices/usersApiSlice';

const UserProfileScreen = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userDetails, isError, isLoading, error } = useGetUserDetailsQuery(userInfo?.id, {
    skip: !userInfo?.id,
  });

  const [updateProfile, { isLoading: isUpdating }] = useProfileMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userDetails) {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [navigate, userInfo, userDetails]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      try {
        await updateProfile({ id: userInfo.id, name, email, password }).unwrap();
        setMessage('Profile Updated Successfully!');
        setShowEditModal(false); // Close modal on successful update
      } catch (err) {
        setMessage(err.data?.message || 'Could not update profile.');
      }
    }
  };

  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  if (isLoading || isUpdating) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Alert variant="danger">{error?.data?.message || 'Error fetching user details'}</Alert>;
  }

  return (
    <Row>
      <Col md={9}>
        <h2>User Profile</h2>
        {message && <Alert variant="danger">{message}</Alert>}
        <div>
          <p><strong>Name:</strong> {userDetails?.name}</p>
          <p><strong>Email:</strong> {userDetails?.email}</p>
          <Button variant="primary" onClick={handleShow}>Edit Profile</Button>
        </div>

        <Modal show={showEditModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              {/* <Form.Group controlId='password'>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter new password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group> */}
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
      </Col>
    </Row>
  );
};

export default UserProfileScreen;
