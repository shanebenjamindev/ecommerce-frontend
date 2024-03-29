import { Space, Table, Tag, message, Button } from "antd";
import { useEffect, useState } from "react";
import * as UserServices from "../../../services/UserService";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import PopupAccountComponent from "../../../components/PopupAccountComponent/PopupAccountComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import PopupComponent from "../../../components/PopupComponent/PopupComponent";

const rowSelection = {
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

export default function UserManagement() {
  const adminUser = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVariant, setModalVariant] = useState("");
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await UserServices.getAllUser(adminUser.access_token);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetDetail = async (id, access_token) => {
    const res = await UserServices.getDetailsUser(id, access_token);
    return setSelectedUser(res.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const showModal = (variant, userId) => {
    setModalVariant(variant);
    if (userId) {
      handleGetDetail(userId, adminUser.access_token);
    }
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDeleteUser = async (userId) => {
    if (userId !== adminUser.id) {
      try {
        const res = await UserServices.deleteUser(
          userId,
          adminUser.access_token
        );
        message.success(res.data.message);
        getAllUsers();
      } catch (error) {
        console.log(error);
        message.error("Failed to delete user.");
      }
    } else {
      message.error("Failed to delete current logged user.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      render: (user) => <img width={"50px"} src={user.avatar} />,
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
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => showModal("Edit Form", user._id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDeleteUser(user._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PopupComponent mode={"user-add"} />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={users}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
}
