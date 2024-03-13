import { Input } from "antd";
import React from "react";

export default function InputComponent({ type, name, placeHolder, ...rests }) {
  return <Input type={type} name={name} placeholder={placeHolder} {...rests} />;
}
