import React, { useState } from "react";
import { Col, Row } from "antd";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "react-query";
import { userHook } from "../../../hooks/userHook";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { DashboardOrderButton } from "./style";
import * as ProductService from "../../../services/ProductService";

import { Bar } from "react-chartjs-2";
import VerticalItemsComponent from "../../../components/VerticalItemsComponent";
import ProductManagement from "../ProductManagement/ProductManagement";
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
      <Col span={18}>
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
          <h3>User Management</h3>
          <UserManagement />
        </section>
      </Col>
      <Col span={6}>
        <div className="list-selling">
          Top Selling Products
          {renderTopSelling()}
        </div>
      </Col>
    </Row>
  );
}
