import { useQuery } from "react-query";
import { Space, Table, Tag, message } from "antd";
import * as ProductService from "../../../services/ProductService";
import PopupAccountComponent from "../../../components/PopupAccountComponent/PopupAccountComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { useState } from "react";

export default function ProductManagement() {
  const [modal, setIsModalVisible] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], () => getAllProduct());

  const showModal = (e) => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getAllProduct = async () => {
    const res = await ProductService.GetAllProduct();
    return res.data;
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
        <div
          className="d-md-flex"
          style={{ gap: "5px ", justifyContent: "center" }}
        >
          <button
            type="button"
            value={product._id}
            className="btn btn-primary"
            onClick={showModal}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            // onClick={() => deleteproduct(product._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={products}
        columns={columns}
        loading={isLoading}
        rowKey={"_id"}
      />
    </div>
  );
}
