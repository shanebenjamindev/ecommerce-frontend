import { useEffect, useState } from "react";
import { Modal, Tabs, Form, Input, Button } from "antd";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const { TabPane } = Tabs;

export default function PopupAccountComponent(props) {

    const { isVisible, handleModalToggle } = props;

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
            localStorage.setItem('access_token', data?.access_token)
            localStorage.setItem('refresh_token', data?.refresh_token)

            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                if (decoded?.id) {
                    handleGetUserDetail(decoded?.id, data?.access_token);
                    handleModalToggle(false)
                }
            }
        }

    }, [isSuccess]);

    const handleGetUserDetail = async (id, access_token) => {
        const res = await UserService.getDetailsUser(id, access_token)
        dispatch(updateUser({ ...res?.data, access_token }))
    }
    const handleLoginFormSubmit = () => {
        // handleModalToggle(false);
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
    )
}

