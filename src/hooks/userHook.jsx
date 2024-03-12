import { useSelector } from "react-redux";

export const userHook = () => {
  const user = useSelector((state) => state.user) || null;
  return user;
};
