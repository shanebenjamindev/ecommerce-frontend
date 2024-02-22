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

export const userLogout = async () => {
    const res = await axios.post(`${VITE_SOME_KEY}/user/log-out`);
    return res.data;
};

export const getDetailsUser = async (id, access_token) => {
    const res = await axios.get(`${VITE_SOME_KEY}/user/get-details/${id}`, {
        headers: {
            token: `Beare ${access_token}`,
        }
    });
    return res.data;
};
export const userUpdate = async (id, newData) => {
    const res = await axios.put(`${VITE_SOME_KEY}/user/update-user/${id}`, newData)
    return res.data;
};
