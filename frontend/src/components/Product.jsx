import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded bg-light text-dark">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" height={250} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* <Card.Text as="div">
          <Row className="rating">
            <Col xs={6}>
              <span>
                {" "}
                {product.rating} <FaStar />
              </span>
            </Col>
            <Col xs={6} className="text-right">
              <span>{`${product.numReviews} reviews`}</span>
            </Col>
          </Row>
        </Card.Text> */}
        <Card.Text as="h3" className="text-left mt-2">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
