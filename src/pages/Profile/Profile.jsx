import { useSelector } from "react-redux";
import { ProfileTable, WrapperProfileUser } from "./style";
import { useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Col, Row } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export default function Profile() {
  const user = useSelector(state => state.user);
  const [userData, setUserData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    password: "",
    confirmPassword: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleEditProfile = () => {
    // Handle edit profile action
  }

  const renderUserInfo = () => {
    return (
      <WrapperProfileUser>
        <ProfileTable>
          <table>
            <tbody> {/* Added tbody for better table structure */}
              <tr>
                <th>Name</th>
                <td>
                  <InputForm name="name" value={userData.name} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <InputForm name="email" value={userData.email} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Password</th>
                <td>
                  <InputForm type="password" name="password" value={userData.password} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Confirm Password</th>
                <td>
                  <InputForm type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>
                  <InputForm name="phone" value={userData.phone} onChange={handleOnChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </ProfileTable>

        <Row justify="end" style={{ marginTop: "16px" }}>
          <ButtonComponent variant="primary" onClick={handleEditProfile} text="Edit Profile" />
        </Row>
      </WrapperProfileUser >
    );
  };

  return (
    <div>
      {user ? (
        <Row justify="center">
          <Col span={12}>
            <Row justify="center">
              <img width="50%" alt="" src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
            </Row>
          </Col>

          <Col span={12}>
            {renderUserInfo()}
          </Col>
        </Row>
      ) : (
        <h2>You havent logged in.</h2>
      )}
    </div>
  );
}
