import { useEffect, useState } from "react";
import { Modal, Tabs, Form, message, Input, Button } from "antd";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { userHook } from "../../hooks/userHook";
import SignupModal from "./SignupModal";
import EditModal from "./EditModal";

const { TabPane } = Tabs;

export default function PopupAccountComponent(props) {
  const { variant, selectedUser, isVisible, handleModalToggle } = props;

  const adminUser = userHook();
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState();

  const [accountLogin, setLoginAccount] = useState({
    email: "",
    password: "",
  });

  const handleOk = () => {
    handleModalToggle(false);
  };

  const handleCancel = () => {
    handleModalToggle(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleOnchange = (e) => {
    const updatedAccount = { ...accountLogin };
    updatedAccount[e.target.name] = e.target.value;
    setLoginAccount(updatedAccount);
  };

  const mutation = useMutationHook((data) => UserService.userSignin(data));
  const { data, isSuccess } = mutation;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", data?.access_token);
      localStorage.setItem("refresh_token", data?.refresh_token);

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetUserDetail(decoded?.id, data?.access_token);
          handleModalToggle(false);
        }
      }
    }
  }, [isSuccess]);

  const handleGetUserDetail = async (id, access_token) => {
    const res = await UserService.getDetailsUser(id, access_token);
    dispatch(updateUser({ ...res?.data, access_token }));
  };

  const handleLoginFormSubmit = () => {
    mutation.mutate(accountLogin);
  };

  const renderLoginForm = () => (
    <Form form={form} onFinish={handleLoginFormSubmit}>
      <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="Email">
        <Input
          autoFocus
          name="email"
          onChange={(e) => {
            handleOnchange(e, "signin");
          }}
          placeholder="Enter your email"
        />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        label="Password"
      >
        <Input
          name="password"
          onChange={(e) => {
            handleOnchange(e, "signin");
          }}
          type="password"
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Form.Item>
          {mutation && mutation.data?.status === "ERR" && (
            <span>{mutation?.data.message}</span>
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );

  const returnFunc = () => {
    switch (variant) {
      case "account":
        return (
          <Modal
            title="Login / Signup"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab="Login" key="login">
                {renderLoginForm()}
              </TabPane>

              <TabPane tab="Signup" key="signup">
                <SignupModal />
              </TabPane>
            </Tabs>
          </Modal>
        );

      case "Edit Form":
        return (
          <Modal
            title={variant}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab={variant} key="edit">
                <EditModal selectedUser={selectedUser} />
              </TabPane>
            </Tabs>
          </Modal>
        );

      case "Add Form":
        return (
          <Modal
            title={variant}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              <TabPane tab={variant} key="signup">
                <SignupModal />
              </TabPane>
            </Tabs>
          </Modal>
        );
      default:
        return null;
    }
  };

  return returnFunc();
}
