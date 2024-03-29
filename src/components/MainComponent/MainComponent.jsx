import { Outlet } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Col, Row } from "antd";
import { WrapperMain, WrapperOutlet, ContainerMain } from "./style";
import CategoryComponent from "../CategoryComponent/CategoryComponent";
import * as TypeService from "../../services/TypeService";
import { useState } from "react";

export default function MainComponent() {
  return (
    <WrapperMain>
      <Breadcrumb />
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <CategoryComponent />
        </Col>
        <Col span={20}>
          <WrapperOutlet>
            <Outlet />
          </WrapperOutlet>
        </Col>
      </Row>
    </WrapperMain>
  );
}
