import axios from "axios";
const { VITE_SOME_KEY } = import.meta.env

export const userSignin = async (data) => {
    const res = await axios.post(`${VITE_SOME_KEY}/user/sign-in`, data);
    return res.data;
};

export const userSignup = async (data) => {
    const res = await axios.post(`${VITE_SOME_KEY}/user/sign-up`, data);
    return res.data;
};
