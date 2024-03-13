import { Col, Row } from "antd";
import React from "react";

export default function VerticalItemsComponent({ item }) {
  return (
    <Row
      gutter={10}
      className="border my-3 p-2"
      key={item.id} // Assuming you have an 'id' property in your item object
    >
      <Col span={8}>
        <img alt={item.name} src={item.image} />
      </Col>
      <Col span={16}>
        <h5>{item.name}</h5>
        <p>Price: {item.price}</p>
      </Col>
    </Row>
  );
}
