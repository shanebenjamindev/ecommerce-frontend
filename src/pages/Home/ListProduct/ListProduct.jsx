import { Row } from "react-bootstrap";
import ProductComponent from "../../../components/ProductComponent/ProductComponent";
import { WrapperListProduct } from "./style";
import * as ProductService from '../../../services/ProductService'
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function ListProduct() {
    const dispatch = useDispatch();

    const getProduct = async () => {
        try {
            const res = await ProductService.GetAllProduct();
            dispatch(getProduct({ ...res.data }));
        } catch (error) {
            console.error("Error fetching user details");
        }
    }
    const renderProduct = () => {
        // return listProduct.map((product, index) => {
        //     return <>
        //         <ProductComponent item={product} key={index} />
        //     </>
        // })
    }
    return (
        <WrapperListProduct className="row justify-content-center">
            {renderProduct()}
        </WrapperListProduct>
    )
}
