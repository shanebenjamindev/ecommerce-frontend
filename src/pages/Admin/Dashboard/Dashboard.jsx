import React, { useState } from "react";
import { Col, Row } from "antd";
import { useQuery } from "react-query";
import { userHook } from "../../../hooks/userHook";
import { DashboardOrderButton } from "./style";
import * as ProductService from "../../../services/ProductService";
import VerticalItemsComponent from "../../../components/VerticalItemsComponent";
import UserManagement from "../UserManagement/UserManagement";

export default function Dashboard() {
  const user = userHook();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery(["product"], () => getAllProduct());

  const getAllProduct = async () => {
    const res = await ProductService.GetAllProduct();
    return res.data;
  };

  const renderTopSelling = () => {
    return products?.map((product, index) => {
      return <VerticalItemsComponent key={index} item={product} />;
    });
  };

  return (
    <Row gutter={40}>
      <Col span={20}>
        <h1>
          Welcome, <span>{user ? user.name : null}</span>
        </h1>
        <DashboardOrderButton>
          <Row gutter={20}>
            <Col>
              <button className="button-order">
                {products ? products.length : 0}
                <br />
                Order
              </button>
            </Col>
            <Col>
              <button>
                123
                <br />
                {isLoading ? "Loading..." : "Profit"}
              </button>
            </Col>
          </Row>
        </DashboardOrderButton>

        <section className="my-4">
          <h4>User Management</h4>
          <UserManagement />
        </section>
      </Col>
      <Col span={4}>
        <div className="list-selling">
          <h4>Top Selling Products</h4>
          {renderTopSelling()}
        </div>
      </Col>
    </Row>
  );
}
