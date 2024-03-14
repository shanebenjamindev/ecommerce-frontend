import { useQuery } from "react-query";
import { Space, Table, Button, Row, Col } from "antd";
import * as ProductService from "../../../services/ProductService";
import * as TypeService from "../../../services/TypeService";
import { userHook } from "../../../hooks/userHook";
import PopupComponent from "../../../components/PopupComponent/PopupComponent";

const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
export default function ProductManagement() {
  const adminUser = userHook();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], () => handleGetAllProduct());

  const {
    data: types,
    isLoading: typeLoading,
    isError: typeError,
  } = useQuery(["type"], () => handleGetAllType());

  const handleGetAllType = async () => {
    const res = await TypeService.getAllType();
    return res.data;
  };
  const handleGetAllProduct = async () => {
    const res = await ProductService.GetAllProduct();
    return res.data;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      key: "image",
      render: (product) => <img width={"50px"} src={product.image} />,
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
        <Space>
          <Button
            type="primary"
            onClick={() => showModal("Edit Form", product._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              handleDeleteProduct(product._id, adminUser.access_token)
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={14}>
        <PopupComponent
          mode={"product"}
          handleGetAllProduct={handleGetAllProduct}
        />
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={products}
          columns={columns}
          rowKey="_id"
        />
      </Col>
      <Col span={10}>
        Type
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          dataSource={types}
          columns={columns}
          rowKey="_id"
        />
      </Col>
    </Row>
  );
}
