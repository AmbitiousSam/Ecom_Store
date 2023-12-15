import React from 'react';
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const carouselImageStyle = {
    maxHeight: '500px', // Adjust the max height as needed
    objectFit: 'cover', // This makes sure the image covers the area uniformly
    width: '100%'
  };

  const carouselCaptionStyle = {
    background: 'rgba(0, 0, 0, 0.5)' // Improves readability of text on images
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || error.error}</Message>;
  }

  return (
    <Carousel pause="hover" variant="dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={carouselImageStyle}
              className="d-block mx-auto"
            />
            <Carousel.Caption style={carouselCaptionStyle} className="carousel-caption text-white">
              <h2>{product.name} (${product.price})</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
