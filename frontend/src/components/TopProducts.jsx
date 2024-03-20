import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopProducts() {
  const { data, error, isLoading } = useGetTopProductsQuery();
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Carousel pause="hover" className="bg-primary mb-4">
            {data?.map((product) => {
              return (
                <Carousel.Item key={product._id}>
                  <Link to={`product/${product._id}`}>
                    <Image src={product.image} alt="" fluid />
                    <Carousel.Caption>
                      <h2>{product.name}</h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </>
      )}
    </div>
  );
}
