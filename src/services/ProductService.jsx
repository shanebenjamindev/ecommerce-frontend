import axios from "axios";
const { VITE_SOME_KEY } = import.meta.env

export const GetAllProduct = async () => {
    const res = await axios.get(`${VITE_SOME_KEY}/product/get-all`);
    return res.data;
};

export const AddProduct = async (newData) => {
    const res = await axios.post(`${VITE_SOME_KEY}/product/create`, newData)
    return res.data;
};
