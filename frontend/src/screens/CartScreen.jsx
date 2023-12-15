import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice.js";
import { Row, Col, Image, Form, Button, ListGroup } from "react-bootstrap";
import Message from "../components/Message.jsx";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <Row>
        <Col md={10} className="mx-auto">
          <h1 style={{ marginTop: "20px" }}>Your Cart</h1>
          {cartItems.length === 0 ? (
            <h3>
              {" "}
              Cart is Empty. <Link to="/">GO BACK</Link>
            </h3>
          ) : (
            <ListGroup variant="flush" className="text-center ">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={3} className="my-auto">
                      <Image
                        src={item.image}
                        alt={`${item.name}`}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3} className="text-center my-auto">
                      <Link
                        to={`products/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4} className="my-auto">
                      <Row>
                        <Col md={5} className="text-center p-2">
                          <p>Quantity:</p>
                        </Col>
                        <Col md={7} className="my-auto">
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2} className="my-auto">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={10} className="mx-auto text-center">
          <h3>
            Total Price : ${" "}
            <strong>
              {" "}
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </strong>
          </h3>
          <Button
            type="button"
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkOutHandler}
          >
            Checkout Now
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
