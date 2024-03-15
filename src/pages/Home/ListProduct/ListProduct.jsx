import { Row } from "react-bootstrap";
import { WrapperListProduct } from "./style";
import * as ProductService from "../../../services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../../redux/slides/productSlide";
import { useQuery } from "react-query";
import ItemComponent from "../../../components/ItemComponent/ItemComponent";

export default function ListProduct() {
  const dispatch = useDispatch();

  const {
    data: listProduct,
    isLoading,
    isError,
  } = useQuery(["product"], () => getAllProduct());

  const getAllProduct = async () => {
    const res = await ProductService.GetAllProduct();
    return res.data;
  };

  const renderProduct = () => {
    return listProduct?.map((product, index) => {
      return <ItemComponent key={index} product={product} />;
    });
  };
  return (
    <>
      <h5>List Product</h5>
      <Row className="section-content justify-content-center">{renderProduct()}</Row>
    </>
  );
}
