import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperCategory = styled.div` 
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 12px 8px;
`
export const CategoryItem = styled(Link)`
    padding: 7px 16px;
    margin-top: 10px;
    transition: all 0.25s ease;
    border-radius: 8px;
    &:hover {
        background-color: var(--hover-bg-secondary);
    }
`