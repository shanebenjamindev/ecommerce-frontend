import { Col } from "react-bootstrap";
import { WrapperProductComponent } from "./style";
export default function ItemComponent({ product }) {
  return (
    <WrapperProductComponent>
      <Col md={3} sm={12} className="bg-dark">
        <div className="custom-overlay"></div>
        <p>{product.name}</p>
        
      </Col>
    </WrapperProductComponent>
  );
}
