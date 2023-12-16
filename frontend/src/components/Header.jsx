import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import {
  FaShoppingCart,
  FaUser,
  FaRegListAlt,
  FaEnvelope,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo2.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkStyle = {
    margin: "0 10px", // Adjust the horizontal margin as needed
    padding: "0 5px", // Adjust the padding as needed
  };

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="nav-barr"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="ProShop"
                className="bg-blend-lighten"
                style={{
                  maxWidth: "100px", // Sets the maximum width of the logo
                  height: "auto", // Scales the height automatically to maintain the aspect ratio
                  display: "block", // Ensures the image does not inline with text
                  marginLeft: "auto", // Centers the logo by using with marginRight
                  marginRight: "auto",
                }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Contact Us Link with Icon */}
              <LinkContainer to="/contact">
                <Nav.Link style={navLinkStyle}>
                  <FaEnvelope /> Contact Us
                </Nav.Link>
              </LinkContainer>

              {/* Cart Icon */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* Orders Icon */}
              {/* {userInfo && (
                <LinkContainer to="/myorders">
                  <Nav.Link>
                    <FaRegListAlt /> My Orders
                  </Nav.Link>
                </LinkContainer>
              )} */}

              {/* Profile Dropdown */}
              {userInfo ? (
                <NavDropdown title={<FaUser />} id="user-menu">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/myorders">
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>

                  {/* Admin Links */}
                  {userInfo.isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Groceries</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
