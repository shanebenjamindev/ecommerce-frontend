import React, { useEffect, useState } from "react";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { Modal, Tabs, message, Form, Input, Button } from "antd";

export default function SignupPage() {
  const [form] = Form.useForm();
  const [accountSignup, setNewAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleOnchange = (e, formType) => {
    const updatedAccount = { ...accountSignup };
    updatedAccount[e.target.name] = e.target.value;
    setNewAccount(updatedAccount);
  };

  const mutation = useMutationHook((data) => UserService.userSignup(data));
  const handleSignupFormSubmit = () => {
    if (accountSignup) {
      mutation.mutate(accountSignup);
      location.reload();
    }
  };
  return (
    <Form form={form} onFinish={handleSignupFormSubmit}>
      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Username"
      >
        <Input
          name="name"
          onChange={(e) => {
            handleOnchange(e, "signup");
          }}
          placeholder="Enter your name"
        />
      </Form.Item>

      <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} label="Email">
        <Input
          name="email"
          onChange={(e) => {
            handleOnchange(e, "signup");
          }}
          type="email"
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} label="Phone">
        <Input
          name="phone"
          onChange={(e) => {
            handleOnchange(e, "signup");
          }}
          type="number"
          placeholder="Enter your phone number"
        />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Password"
      >
        <Input
          name="password"
          onChange={(e) => {
            handleOnchange(e, "signup");
          }}
          type="password"
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        label="Confirm Password"
      >
        <Input
          name="confirmPassword"
          onChange={(e) => {
            handleOnchange(e, "signup");
          }}
          type="password"
          placeholder="Confirm your password"
        />
      </Form.Item>

      <Form.Item style={{ textAlign: "right" }}>
        <Form.Item>
          {mutation && mutation.data?.status === "ERR" && (
            <span>{mutation?.data.message}</span>
          )}
          {mutation && mutation.data?.status === "OK" && (
            <span>successfully register</span>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );
}
