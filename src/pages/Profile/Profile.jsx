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
  const [userAvatar, setAvatar] = useState("");
  const [avatarPreview, setavatarPreview] = useState("");

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
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.confirmPassword || !newUser.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    mutation.mutate(user?.id, newUser);
  }

  useEffect(() => {
    if (isSuccess) {
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeoutId);
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
              <img src={userAvatar} />
              <InputForm type={"file"} accept="/image/*" onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.subString(0, 5) === "image") {
                  setAvatar(file)
                }
              }} />
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
// <img width="50%" alt="" src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
