import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Upload, Select } from "antd";
import InputComponent from "../InputComponent/InputComponent";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHook } from "../../hooks/useMutationHook";

const PopupComponent = ({ mode, types }) => {
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

  const renderType = () => {
    if (types) {
      return (
        <select name="type" onChange={handleOnChange}>
          {types?.map((type, index) => {
            return (
              <option key={index} value={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
      );
    }
  };

  const renderModal = (mode) => {
    switch (mode) {
      case "product-add":
        return (
          <>
            <div>
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
                  >
                    <Upload onChange={handleOnChangeAvatar}>
                      <Button
                        icon={<UploadOutlined />}
                        type="file"
                        name="image"
                      >
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
                  >
                    {types ? renderType() : null}
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
            </div>
          </>
        );
      case "user-add":
        return (
          <>
            <div>
              <Button type="primary" onClick={showModal}>
                <PlusCircleOutlined /> Add User
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
                  >
                    <Upload onChange={handleOnChangeAvatar}>
                      <Button
                        icon={<UploadOutlined />}
                        type="file"
                        name="image"
                      >
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
                  >
                    {types ? renderType() : null}
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
                    rule={[
                      { require: true, message: "Please input this line" },
                    ]}
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
            </div>
          </>
        );
      default:
        return null;
    }
  };
  return <>{renderModal(mode)}</>;
};
export default PopupComponent;
