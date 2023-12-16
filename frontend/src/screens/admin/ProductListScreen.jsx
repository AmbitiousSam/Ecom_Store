import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // const [createProduct, { isLoading: loadingCreate }] =
  //   useCreateProductMutation();

  // const createProductHandler = async () => {
  //   if (window.confirm("Are you sure you want to add a new Guitar?")) {
  //     try {
  //       navigate("/admin/product/add");
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Groceries</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to={`/admin/product/add`}>
            <Button className="my-3 btn-bg">
              <FaPlus /> Add Grocery
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> */}
          <ListGroup>
            {data.products.map((product) => (
              <ListGroup.Item key={product._id}>
                <strong>Product ID:</strong> {product._id}
                <br />
                <strong> Name:</strong> {product.name}
                <br />
                <strong>Price:</strong> {product.price}
                <br />
                <strong>Category</strong> {product.category}
                <br />
                <strong>Brand:</strong> {product.brand}
                <br />
                <strong>Actions:</strong>{" "}
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash style={{ color: "white" }} />
                </Button>
                <br />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
