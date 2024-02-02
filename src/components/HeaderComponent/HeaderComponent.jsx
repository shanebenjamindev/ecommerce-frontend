import { Link } from "react-router-dom";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import logo from '/images/logo.png';
import { Col, Row, Popover } from "antd";
import { HomeOutlined, SearchOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { SearchButton, WrapperSearch } from "./style";
import { useEffect, useState } from "react";
import * as UserService from '../../services/UserService';
import { useDispatch, useSelector } from "react-redux";
import { resetUser, updateUser } from "../../redux/slides/userSlide";
import PopupAccountComponent from "../PopupAccountComponent/PopupAccountComponent";
import Loading from "../LoadingComponent/LoadingComponent";
import { jwtDecode } from "jwt-decode";


export default function HeaderComponent() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
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
  }

  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await UserService.userLogout();
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    dispatch(resetUser())
    setLoading(false)
  }

  const contentDropdown = (
    <Col>
      <Link to={`/admin/admin-info/${user.id}`}>
        <p className="ml-1">Trang cá nhân</p>
      </Link>
      <Row justify={"center"}>
        <button width={"100%"} onClick={handleLogout}>Out</button>
      </Row>
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
                  <Loading isLoading={loading} >

                    {user?.name ?
                      <li className="nav-item">
                        <Popover placement="bottom" content={contentDropdown}>
                          <Link className="nav-link d-flex" to={`/admin/admin-info/${user.id}`}>
                            <img width="25" height="25" alt="" src={user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
                            <span className="ml-1">{`${user.name}`}</span>
                          </Link>
                        </Popover>
                      </li>
                      :
                      <li onClick={showModal}>
                        <ButtonComponent className="nav-link" variant="button-secondary" text={<><SmileOutlined /> Tài khoản</>} />
                      </li>
                    }
                  </Loading>

                  <li className="nav-item">
                    <ButtonComponent className="nav-link" variant="button-primary" text={<ShoppingCartOutlined />} />
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
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
      </nav >
      <PopupAccountComponent isVisible={isModalVisible} handleModalToggle={handleCancel} />
    </div >
  );
}
