import styled from "styled-components";

export const WrapperProfileUser = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  height: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileTable = styled.table`
  display: flex;
  table {
    th{
      padding: 10px 30px;
    }
    td {
      padding: 5px;
    }
  }
`;

export const WrapperProfileAvatar = styled.div`
  display: flex;
  justify-content: center;
position: relative;
  align-items: center;
`