import { useSelector } from "react-redux";
import { ProfileTable, WrapperProfileUser } from "./style";
import { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Col, Row } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
export default function Profile() {
  const user = useSelector(state => state.user);
  const [newUser, setUserData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    password: "",
    confirmPassword: ""
  });

  const mutation = useMutationHook(data => UserService.userUpdate(data, newUser));

  const { data, isSuccess } = mutation;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleEditProfile = () => {
    mutation.mutate(user?.id, newUser);
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess])

  const renderUserInfo = () => {
    return (
      <WrapperProfileUser>
        <ProfileTable>
          <table >
            <tbody>
              <tr>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  <InputForm name="name" value={newUser.name} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>
                  <InputForm name="email" value={newUser.email} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Password</th>
                <td>
                  <InputForm type="password" name="password" value={newUser.password} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Confirm Password</th>
                <td>
                  <InputForm type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={handleOnChange} />
                </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>
                  <InputForm name="phone" value={newUser.phone} onChange={handleOnChange} />
                </td>
              </tr>
            </tbody>
            {mutation && mutation?.data && <span>{mutation?.data.message}</span>}

            <Row justify="end" style={{ marginTop: "16px" }}>
              <ButtonComponent onClick={handleEditProfile} type="button" variant="primary" text="Edit Profile" />
            </Row>
          </table>
        </ProfileTable>

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
