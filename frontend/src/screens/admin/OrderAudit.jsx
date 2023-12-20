import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { BsCalendar } from "react-icons/bs";
import "../../assets/styles/OrderAudit.css";

const OrderAudit = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error.toString()}</Message>;

  const processOrders = (orders) => {
    const monthlyData = {};
    orders.forEach((order) => {
      const monthYear = new Date(order.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { count: 0, total: 0 };
      }
      monthlyData[monthYear].count++;
      monthlyData[monthYear].total += order.totalPrice;
    });
    return monthlyData;
  };

  const monthlyOrders = processOrders(orders || []);

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {Object.keys(monthlyOrders).map((month, idx) => (
        <Col key={month} className={`my-col-${idx % 5}`}>
          <Card className="square-card">
            <Card.Body>
              <Card.Title className="card-title">
                <BsCalendar /> {month}
              </Card.Title>
              <Card.Text className="card-text">
                Orders: {monthlyOrders[month].count}
              </Card.Text>
              <Card.Text className="card-text">
                Total: ${monthlyOrders[month].total.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OrderAudit;
