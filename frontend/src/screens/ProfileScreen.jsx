import { ListGroup, Badge, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const ProfileScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          //   <Table striped table hover responsive className="table-sm">
          //     <thead>
          //       <tr>
          //         <th>ID</th>
          //         <th>DATE</th>
          //         <th>TOTAL</th>
          //         <th>PAID</th>
          //         <th>DELIVERED</th>
          //         <th></th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {orders.map((order) => (
          //         <tr key={order._id}>
          //           <tD>{order._id}</tD>
          //           <td>{order.createdAt.substring(0, 10)}</td>
          //           <td>{order.totalPrice}</td>
          //           <td>
          //             {order.isPaid ? (
          //               order.paidAt.substring(0, 10)
          //             ) : (
          //               <FaTimes style={{ color: "red" }} />
          //             )}
          //           </td>
          //           <td>
          //             {order.isDelivered ? (
          //               order.deliveredAt.substring(0, 10)
          //             ) : (
          //               <FaTimes style={{ color: "red" }} />
          //             )}
          //           </td>
          //           <td>
          //             <LinkContainer to={`/order/${order._id}`}>
          //               <Button className="btn-sm" variant="light">
          //                 Details
          //               </Button>
          //             </LinkContainer>
          //           </td>
          //         </tr>
          //       ))}
          //     </tbody>
          //   </Table>
          // )}
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
                  <Badge bg="success">
                    {order.deliveredAt.substring(0, 10)}
                  </Badge>
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
      </Col>
    </Row>
  );
};

export default ProfileScreen;
