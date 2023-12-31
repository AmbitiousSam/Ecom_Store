import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button, ListGroup, Badge } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>All Orders</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to={`/admin/order/audit`}>
            <Button className="mb-3 btn-bg">
              <FaEye /> View Audit
            </Button>
          </LinkContainer>
        </Col>
      </Row>{" "}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <ListGroup>
          {orders.map((order) => (
            <ListGroup.Item key={order._id}>
              <strong>Order ID:</strong> {order._id}
              <br />
              <strong>Customer Name:</strong> {order.user && order.user.name}
              <br />
              <strong>Order Date:</strong>
              {order.createdAt.substring(0, 10)}
              <br />
              <strong>Total Amount:</strong> ${order.totalPrice}
              <br />
              <strong>Payment Status </strong>
              {order.isPaid ? (
                <Badge bg="success">{order.paidAt.substring(0, 10)}</Badge>
              ) : (
                <Badge bg="danger">Pending</Badge>
              )}
              <br />
              <strong>Delivery Status: </strong>
              {order.isDelivered ? (
                <Badge bg="success">{order.deliveredAt.substring(0, 10)}</Badge>
              ) : (
                <Badge bg="danger">Pending</Badge>
              )}
              <br />
              <strong>Actions:</strong>
              <LinkContainer to={`/order/${order._id}`}>
                <Button type="button" className="btn-sm btn-bg m-1">
                  View Order
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default OrderListScreen;
