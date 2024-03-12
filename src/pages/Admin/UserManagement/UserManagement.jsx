import { Space, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import * as UserServices from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import PopupAccountComponent from "../../../components/PopupAccountComponent/PopupAccountComponent";
import ButtonComponent from "../../../components/ButtonComponent/ButtonComponent";
import { PlusCircleOutlined } from "@ant-design/icons";

const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

export default function UserManagement() {
  const adminUser = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState("");
  const [modal, setIsModalVisible] = useState(false);
  const [modalVariant, setModalVariant] = useState("");

  const [selectionType, setSelectionType] = useState("checkbox");
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["user"], () => getAllUser(adminUser.access_token));

  const showModal = (e) => {
    setIsModalVisible(true);
    const id = e?.target.value;
    id ? getUserDetail(id, adminUser.access_token) : null;
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAllUser = async () => {
    try {
      const res = await UserServices.getAllUser(adminUser.access_token);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetail = async (id, access_token) => {
    try {
      const res = await UserServices.getDetailsUser(id, access_token);
      return setSelectedUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (value) => {
    const res = await UserServices.deleteUser(value, adminUser.access_token);
    const { message } = res.data;
    alert(message);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      render: (user) => (
        <div
          className="d-md-flex"
          style={{ gap: "5px ", justifyContent: "center" }}
        >
          <button
            type="button"
            value={user._id}
            className="btn btn-primary"
            onClick={() => {
              setModalVariant("adminEdit") | showModal();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteUser(user._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PopupAccountComponent
        isVisible={modal}
        variant={modalVariant}
        selectedUser={selectedUser}
        handleModalToggle={handleCancel}
      />
      <button
        onClick={() => {
          setModalVariant("adminAdd") | showModal();
        }}
      >
        <PlusCircleOutlined /> Add User
      </button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        dataSource={users}
        columns={columns}
        loading={isLoading}
        rowKey={"_id"}
      />
    </div>
  );
}
