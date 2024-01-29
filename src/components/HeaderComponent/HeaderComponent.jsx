import { Link, useNavigate } from "react-router-dom";
import { userHook } from "../../hooks/userHook";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import logo from '/images/logo.png';
import { Button, Col, Dropdown, Form, Input, Modal, Row, Tabs } from "antd";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { SearchButton, WrapperSearch } from "./style";
import { useEffect, useState } from "react";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";


export default function HeaderComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector(state => state.user);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-100 fixed-top bg-white">
      <nav className="w-75 m-auto admin__Navbar navbar navbar-expand-lg navbar-light justify-content-between">

        <Col md={2}>
          <Link className="navbar-brand d-flex justify-content-center align-items-center" to="/admin/dashboard">
            <img
              width="75px"
              src={logo}
              alt=""
            />
          </Link>
        </Col>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContentAdmin"
          aria-controls="navbarSupportedContentAdmin"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Col md={22}>
          <Row>
            <Col md={18}>
              <WrapperSearch
                type='text'
                placeholder="Nhập tên sản phẩm để tìm kiếm"
                suffix={<SearchButton icon={<SearchOutlined />} >Search</SearchButton>}
              />
            </Col>

            <Col md={6}>
              <div
                className="collapse navbar-collapse text-center"
                id="navbarSupportedContentAdmin"
              >
                <div
                  className="overlay-hidden"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContentAdmin"
                  aria-controls="navbarSupportedContentAdmin"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                ></div>

                <ul className="navbar-nav ml-auto main__p">
                  <li className="nav-item">
                    <Link to="/">
                      <ButtonComponent variant="button-primary" text={<>
                        <HomeOutlined /> Trang chủ
                      </>} />
                    </Link>
                  </li>

                  {user?.name ?
                    <li className="nav-item">
                      <Dropdown overlay={<div className="bg-light"><ButtonComponent variant="danger" text="Log out"></ButtonComponent></div>} placement="bottomCenter">
                        <Link className="nav-link d-flex" to={`/admin/admin-info/${user.id}`}>
                          <img width="25" height="25" alt="" src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
                          <span className="ml-1">{`${user.name}`}</span>
                        </Link>
                      </Dropdown>
                    </li>
                    :
                    <li onClick={showModal}>
                      <ButtonComponent className="nav-link" variant="button-secondary" text={<><SmileOutlined /> Tài khoản</>} />
                    </li>
                  }
                  <li className="nav-item">
                    <ButtonComponent className="nav-link" variant="button-primary" text={<ShoppingCartOutlined />} />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <ModalAccount isVisible={isModalVisible} handleModalToggle={handleCancel} />
          <Row className="mt-2" justify={"space-between"}>
            <div>
              điện gia dụng
              xe cộ
              mẹ & bé
              khỏe đẹp
              nhà cửa
              sách
              thể thao
            </div>

            <div>
              Giao đến: Q. 1, P. Bến Nghé, Hồ Chí Minh
            </div>
          </Row>
        </Col>
      </nav>
    </div>
  );
}

const { TabPane } = Tabs;

function ModalAccount({ isVisible, handleModalToggle }) {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('login');
  const [accountSignup, setNewAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
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

  const handleOnchange = (e, formType) => {
    const updatedAccount = formType === 'signup' ? { ...accountSignup } : { ...accountLogin };
    updatedAccount[e.target.name] = e.target.value;

    formType === 'signup' ? setNewAccount(updatedAccount) : setLoginAccount(updatedAccount);
  };

  const mutationSignup = useMutationHook(data => UserService.userSignup(data));

  const mutation = useMutationHook(
    data => UserService.userSignin(data)
  )
  const { data, isSuccess } = mutation;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      localStorage.setItem('access_token', data?.access_token);

      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.payload.id) {
          handleGetUserDetail(decoded?.payload.id, data?.access_token)
        }
      }
    }

  }, [isSuccess]);

  const handleGetUserDetail = async (id, token) => {
    const res = await UserService.getUserData(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }
  const handleLoginFormSubmit = () => {
    mutation.mutate(accountLogin);
  };

  const handleSignupFormSubmit = () => {
    mutationSignup.mutate(accountSignup);
  };

  const renderLoginForm = () => (
    <Form form={form} onFinish={handleLoginFormSubmit}>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        label="Email"
      >
        <Input name="email" onChange={(e) => { handleOnchange(e, 'signin') }} placeholder="Enter your email" />
      </Form.Item>
      <Form.Item
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        label="Password"
      >
        <Input name="password" onChange={(e) => { handleOnchange(e, 'signin') }} type="password" placeholder="Enter your password" />
      </Form.Item>

      <Form.Item>
        {mutation && mutation.data?.status === 'ERR' && <span>{mutation?.data.message}</span>}
      </Form.Item>

      <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );

  const renderSignupForm = () => (
    <Form onFinish={handleSignupFormSubmit}>
      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Username"
      >
        <Input name="name" onChange={(e) => { handleOnchange(e, 'signup') }} placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Email"
      >
        <Input name="email" onChange={(e) => { handleOnchange(e, 'signup') }} type="email" placeholder="Enter your email" />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Phone"
      >
        <Input name="phone" onChange={(e) => { handleOnchange(e, 'signup') }} type='number' placeholder="Enter your phone number" />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Password"
      >
        <Input name="password" onChange={(e) => { handleOnchange(e, 'signup') }} type="password" placeholder="Enter your password" />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Confirm Password"
      >
        <Input name="confirmPassword" onChange={(e) => { handleOnchange(e, 'signup') }} type="password" placeholder="Confirm your password" />
      </Form.Item>
      {/* Uncomment this block when you have error handling in place */}
      {/* <Form.Item>
        {mutationSignup && mutationSignup.data?.status === 'ERR' && <span>{mutationSignup?.data.message}</span>}
      </Form.Item> */}
      {/* Uncomment this block when you have loading state handling in place */}
      {/* <LoadingComponent isLoading={mutationSignup.data}>
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Signup
          </Button>
        </Form.Item>
      </LoadingComponent> */}
    </Form>
  );

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
          {renderSignupForm()}
        </TabPane>
      </Tabs>
    </Modal>
  );
}
