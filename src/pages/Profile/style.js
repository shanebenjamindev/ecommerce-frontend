import styled from "styled-components";

export const WrapperProfileUser = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const ProfileTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  justify-content: center;
  display: flex;
  table {
    th{
      padding: 10px 30px;
    }
  }
`;

export const ProfileTableHeader = styled.th`
  padding: 10px;
  background-color: #333;
  color: #fff;
`;

export const ProfileTableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

export const InputForm = styled.input`
    background-color: red;
`