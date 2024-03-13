import { Card, Col } from "antd";
const { Meta } = Card;

export default function ItemComponent({ product }) {
  return (
    <Col span={24 / 4}>
      <Card
        style={{ height: "100%" }}
        hoverable
        cover={<img height={"250px"} alt={product.name} src={product.image} />}
      >
        <Meta title={product.name} description={product.description} />
      </Card>
    </Col>
  );
}
