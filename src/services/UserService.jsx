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

export const getUserData = async (id, access_token) => {
    const res = await axios.get(`${VITE_SOME_KEY}/user/detail-user/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
};
