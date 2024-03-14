import axios from "axios";
const { VITE_SOME_KEY } = import.meta.env;

export const getAllType = async () => {
  try {
    const res = await axios.get(`${VITE_SOME_KEY}/type/get-all`);
    return res.data;
  } catch (error) {
    console.error("Error fetching all type:", error);
    throw error;
  }
};
