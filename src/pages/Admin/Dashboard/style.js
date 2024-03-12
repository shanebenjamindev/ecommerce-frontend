import { Col } from "antd";
import styled from "styled-components";

export const DashboardOrderButton = styled(Col)`
 
 & button {
    color : var(--white-color);
    background-color: var(--secondary-color) ;
    padding: 40px 150px;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;   
    transition: all 0.25s ease;
   
    &:hover {
        background-color: var(--primary-color); 
        scale: calc(1.2);
        transform: translate(-30px, 10px);
    }
}
`