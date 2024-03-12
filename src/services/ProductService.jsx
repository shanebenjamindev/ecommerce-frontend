import axios from "axios";
const { VITE_SOME_KEY } = import.meta.env;

export const GetAllProduct = async () => {
  try {
    const res = await axios.get(`${VITE_SOME_KEY}/product/get-all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const AddProduct = async (newData) => {
  const res = await axios.post(`${VITE_SOME_KEY}/product/create`, newData);
  return res.data;
};

export const DeleteProduct = async (id, access_token) => {
  const res = await axios.delete(`${VITE_SOME_KEY}/product/delete/${id}`, {
    headers: {
      token: `Beare ${access_token}`,
    },
  });
  return res;
};
