import { Outlet } from "react-router-dom";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { Col, Row } from "antd";
import { WrapperMain, WrapperOutlet } from "./style";
import CategoryComponent from "../CategoryComponent/CategoryComponent";

export default function MainComponent() {
    return (
        <WrapperMain className="w-75 m-auto">
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
    )
}
