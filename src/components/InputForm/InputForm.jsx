import { Input } from "antd";

const InputForm = ({ value, onChange, name, type }) => {

  const theType = () => {
    if (type === "password") {
      return "password"
    }
    if (type === "file") {
      return "file"
    }
    else "text"
  }
  const handleChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: e.target.value
        }
      });
    }
  };


  return <Input value={value} type={theType()} onChange={handleChange} />;
};

export default InputForm;
