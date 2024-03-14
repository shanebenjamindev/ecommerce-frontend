import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Upload } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { error } from "jquery";

const PopupComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    type: "",
    countInStock: "",
    rating: "",
  });

  const mutation = useMutationHook((data) =>
    ProductService.createProduct(data)
  );

  const { data, isLoading, isSuccess, isError } = mutation;

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetAllProduct = async () => {
    try {
      const res = await ProductService.GetAllProduct();
      return res.data;
    } catch (e) {
      console.log(e.error);
    }
  };
  const resz = handleGetAllProduct();
  
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const onFinish = () => {
    if (stateProduct) {
      mutation.mutate(stateProduct);
      handleGetAllProduct();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    onFinish();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        <PlusCircleOutlined /> Add Product
      </Button>

      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Image"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <Upload onChange={handleOnChangeAvatar}>
              <Button icon={<UploadOutlined />} type="file" name="image">
                Select
              </Button>
            </Upload>
            {stateProduct.image ? (
              <img
                name="image"
                src={stateProduct.image}
                alt="productImage"
                height={"100px"}
                width={"100px"}
              />
            ) : null}
          </Form.Item>
          <Form.Item
            label="Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              onChange={handleOnChange}
              name="name"
              value={stateProduct.name}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              onChange={handleOnChange}
              name="price"
              type="number"
              value={stateProduct.price}
            />
          </Form.Item>
          <Form.Item
            label="Type"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              name="type"
              value={stateProduct.type}
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item
            label="Quantity"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              onChange={handleOnChange}
              name="countInStock"
              type="number"
              value={stateProduct.countInStock}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              name="description"
              onChange={handleOnChange}
              type="textarea"
              value={stateProduct.description}
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            rule={[{ require: true, message: "Please input this line" }]}
          >
            <InputComponent
              onChange={handleOnChange}
              name="rating"
              placeHolder="rating"
              type="number"
              value={stateProduct.rating}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PopupComponent;
