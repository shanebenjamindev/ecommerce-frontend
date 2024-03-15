import { Button, Modal } from "antd";
import React, { useState } from "react";
import * as UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";

export default function PopupSelectionComponent({ title, children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleLogout();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await UserService.userLogout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(resetUser());
    navigate("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <button onClick={showModal}>{children}</button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
}
