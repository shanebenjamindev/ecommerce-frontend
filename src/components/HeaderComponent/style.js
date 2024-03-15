import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperSearch = styled(Input)`
    background-color: white;
`
export const SearchButton = styled(Button)`
    border-radius: 0;
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid inherit;
`
export const UserAvatarWrapper = styled.div`
    border-radius: 14px;
    img {
        border-radius: 50%;
    }
`
export const WrapperContentDropdown = styled.div`
    gap: 14px;
    display: flex;
    flex-direction: column;
    >* {
        transition: all 0.25s ease;
        border-radius: 5px;
        padding: 10px 30px;
        &:hover {
            background-color: var(--hover-bg-secondary);
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
    }
    > :last-child:hover {
        background-color: red;
        color: white;
    }
 
`