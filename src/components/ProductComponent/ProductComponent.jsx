import { Col } from 'react-bootstrap'
export default function ProductComponent({ item }) {
    return (
        <Col md={3} sm={12} className='custom-card'>
            <div className='custom-overlay'></div>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
        </Col>
    )
}
