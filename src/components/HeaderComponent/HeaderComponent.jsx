import { Link, useNavigate } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import logo from "/images/logo.png";
import { Col, Row, Popover } from "antd";
import {
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  SearchButton,
  UserAvatarWrapper,
  WrapperContentDropdown,
  WrapperSearch,
} from "./style";
import { useEffect, useState } from "react";
import * as UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "../../redux/slides/userSlide";
import PopupAccountComponent from "../PopupAccountComponent/PopupAccountComponent";
import Loading from "../LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";
import { userHook } from "../../hooks/userHook";
import PopupSelectionComponent from "../PopupSelectionComponent/PopupSelectionComponent";

export default function HeaderComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = userHook();
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = localStorage?.getItem("access_token");
    if (access_token) {
      const decoded = jwtDecode(access_token);
      if (decoded?.id) {
        handleGetUserDetail(decoded?.id, access_token);
      }
    }
  }, []);

  const handleGetUserDetail = async (id, access_token) => {
    try {
      const res = await UserService.getDetailsUser(id, access_token);
      dispatch(updateUser({ ...res.data, access_token }));
    } catch (error) {
      console.error("Error fetching user details");
    }
  };

  const contentDropdown = (
    <Col>
      <WrapperContentDropdown>
        {user?.isAdmin && <Link to="/admin/dashboard">Trang Quản trị</Link>}
        <Link to={`/profile`}>Trang cá nhân</Link>

        <PopupSelectionComponent title ="Log out" children="Log Out" />
      </WrapperContentDropdown>
    </Col>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="w-100 fixed-top bg-white">
      <Row className="m-auto admin__Navbar navbar navbar-expand-lg navbar-light justify-content-between">
        <Col md={4} sm={2}>
          <Link
            className="navbar-brand d-flex justify-content-center align-items-center"
            to="/"
          >
            <img width="75px" src={logo} alt="" />
          </Link>
        </Col>

        <Col md={20} sm={10}>
          <Col
            sm={3}
            className="overlay-hidden"
            data-toggle="collapse"
            data-target="#navbarSupportedContentAdmin"
            aria-controls="navbarSupportedContentAdmin"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></Col>

          <Row>
            <Col md={18}>
              <WrapperSearch
                type="text"
                placeholder="Nhập tên sản phẩm để tìm kiếm"
                suffix={
                  <SearchButton icon={<SearchOutlined />}>Search</SearchButton>
                }
              />
            </Col>

            <Col md={6}>
              <div
                className="collapse navbar-collapse text-center"
                id="navbarSupportedContentAdmin"
              >
                <ul className="navbar-nav w-100 d-flex justify-content-center">
                  <li className="nav-item">
                    <Link to="/">
                      <ButtonComponent
                        variant="button-primary"
                        text={
                          <>
                            <HomeOutlined /> Trang chủ
                          </>
                        }
                      />
                    </Link>
                  </li>
                  {user?.name ? (
                    <li className="nav-item">
                      <Popover placement="bottom" content={contentDropdown}>
                        <UserAvatarWrapper>
                          <Link className="nav-link d-flex" to={`/profile`}>
                            <img
                              width="30"
                              height="30"
                              alt="user avatar"
                              src={
                                user?.avatar ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                              }
                            />
                          </Link>
                        </UserAvatarWrapper>
                      </Popover>
                    </li>
                  ) : (
                    <li onClick={showModal}>
                      <ButtonComponent
                        className="nav-link"
                        variant="button-secondary"
                        text={
                          <>
                            <SmileOutlined /> Tài khoản
                          </>
                        }
                      />
                    </li>
                  )}

                  <li className="nav-item">
                    <ButtonComponent
                      className="nav-link"
                      variant="button-primary"
                      text={<ShoppingCartOutlined />}
                    />
                  </li>
                </ul>
              </div>
            </Col>

            <Col sm={12}>
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
            </Col>
          </Row>

          <Row className="mt-2" justify={"space-between"}>
            <div>
              điện gia dụng xe cộ mẹ & bé khỏe đẹp nhà cửa sách thể thao
            </div>

            <div>Giao đến: Q. 1, P. Bến Nghé, Hồ Chí Minh</div>
          </Row>
        </Col>
      </Row>
      <PopupAccountComponent
        variant="account"
        isVisible={isModalVisible}
        handleModalToggle={handleCancel}
      />
    </div>
  );
}
