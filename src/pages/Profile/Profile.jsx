import { useSelector } from "react-redux";
import {
  ProfileTable,
  WrapperProfileAvatar,
  WrapperProfileUser,
} from "./style";
import { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import { Button, Col, Row, Space, Upload } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { getBase64 } from "../../utils";
import { UploadFileOutlined } from "@mui/icons-material";
import { userHook } from "../../hooks/userHook";
export default function Profile() {
  const user = userHook();

  const [newUser, setUserData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    avatar: user ? user.avatar : "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutationHook((data) =>
    UserService.userUpdate(data, newUser, user?.access_token)
  );

  const { data, isSuccess } = mutation;

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setUserData({
      ...newUser,
      avatar: file.preview,
    });
  };

  const handleClearProfile = () => {
    setUserData({
      name: "",
      email: "",
      phone: "",
      avatar: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.confirmPassword ||
      !newUser.phone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    mutation.mutate(user?.id, newUser);
  };

  useEffect(() => {
    console.log(mutation);
  }, [isSuccess]);

  const renderUserInfo = () => {
    return (
      <WrapperProfileUser>
        <h4>Hello, {user?.name}</h4>
        <ProfileTable>
          <tbody>
            <tr>
              <th>Name</th>
              <td>
                <InputForm
                  name="name"
                  value={newUser.name}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <InputForm
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <InputForm
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th>Confirm Password</th>
              <td>
                <InputForm
                  type="password"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>
                <InputForm
                  name="phone"
                  value={newUser.phone}
                  onChange={handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th></th>
              <td>
                <Row gutter={30} justify="end">
                  <Button onClick={handleClearProfile} type="Default">
                    Clear
                  </Button>
                  <Button onClick={handleEditProfile} type="primary">
                    Save
                  </Button>
                </Row>
              </td>
            </tr>
          </tbody>
        </ProfileTable>
      </WrapperProfileUser>
    );
  };

  return (
    <div>
      {user ? (
        <Row gutter={30} justify="center">
          <Col span={12}>
            <WrapperProfileAvatar>
              <div>
                {user.avatar ? (
                  <div>
                    <img
                      width={"100%"}
                      height={"300px"}
                      name="image"
                      src={user.avatar}
                      alt="productImage"
                    />
                  </div>
                ) : (
                  <div>
                    {newUser.avatar ? (
                      <img
                        width={"100%"}
                        height={"300px"}
                        name="image"
                        src={newUser.avatar}
                        alt="productImage"
                      />
                    ) : (
                      <img
                        alt="user"
                        width={"100%"}
                        height={"300px"}
                        src={
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                      />
                    )}
                  </div>
                )}
                <div className="text-center mt-2">
                  <Upload onChange={handleOnChangeAvatar}>
                    <Button
                      icon={<UploadFileOutlined />}
                      type="file"
                      name="image"
                    >
                      Select
                    </Button>
                  </Upload>
                </div>
              </div>
            </WrapperProfileAvatar>
          </Col>

          <Col span={12}>{renderUserInfo()}</Col>
        </Row>
      ) : (
        <p>You havent logged in.</p>
      )}
    </div>
  );
}
// <img width="50%" alt="" src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} />
