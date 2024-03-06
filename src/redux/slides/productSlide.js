import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const productSlide = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProduct: (state, action) => {
            console.log("a");
            const { _id, name, image, type, price, countInStock, rating, description, discount, selled } = action.payload;
            state.id = _id;
            state.name = name;
            state.image = image;
            state.type = type;
            state.price = price;
            state.countInStock = countInStock;
            state.rating = rating;
            state.description = description;
            state.discount = discount;
            state.selled = selled;

        },
        resetProduct: (state) => {
            state.id = "";
            state.name = "";
            state.image = "";
            state.type = "";
            state.price = "";
            state.countInStock = "";
            state.rating = "";
            state.description = "";
            state.discount = "";
            state.selled = "";
        }
    },
})

export const { getProduct, resetProduct } = productSlide.actions
export default productSlide.reducer