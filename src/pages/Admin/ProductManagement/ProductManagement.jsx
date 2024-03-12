import { useQuery } from "react-query";
import { Space, Table, Tag, message, Button } from "antd";
import * as ProductService from "../../../services/ProductService";
import PopupAccountComponent from "../../../components/PopupAccountComponent/PopupAccountComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { userHook } from "../../../hooks/userHook";

const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
export default function ProductManagement() {
  const [selectedUser, setSelectedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVariant, setModalVariant] = useState("");

  const adminUser = userHook();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], () => getAllProduct());

  const showModal = (e) => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const getAllProduct = async () => {
    const res = await ProductService.GetAllProduct();
    return res.data;
  };

  const handleDeleteProduct = async (userId) => {
    try {
      const res = await ProductService.DeleteProduct(userId, adminUser.access_token);
      message.success(res.data.message);
      getAllProduct();
    } catch (error) {
      console.log(error);
      message.error("Failed to delete user.");
    }
  };

  const renderProduct = () => {};

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "countInStock",
      key: "countInStock",
    },
    {
      title: "Action",
      render: (product) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => showModal("Edit Form", product._id)}
          >
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteProduct(product._id, adminUser.access_token)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PopupAccountComponent
        isVisible={modalVisible}
        variant={modalVariant}
        selectedUser={selectedUser}
        handleModalToggle={handleCancel}
      />
      <Button type="primary" onClick={() => showModal("Add Form")}>
        <PlusCircleOutlined /> Add User
      </Button>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={products}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
}
