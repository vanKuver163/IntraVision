import {CartItem, CartState} from "@/app/features/cart/type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "@/app/features/product/type";
import {RootState} from "@/app/store/store";


const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: {
            reducer: (state, action: PayloadAction<CartItem>) => {
                const existingItem = state.items.find(
                    item => item.product.id === action.payload.product.id
                );
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
            },
            prepare: (product: Product) => ({
                payload: {
                    product,
                    quantity: 1,
                },
            }),
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                item => item.product.id !== action.payload
            );
        },
        updateQuantity: {
            reducer: (
                state,
                action: PayloadAction<{ id: number; quantity: number }>
            ) => {
                const item = state.items.find(item => item.product.id === action.payload.id);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            },
            prepare: (id: number, quantity: number) => ({
                payload: {id, quantity},
            }),
        },
        resetCart: () => {
            return initialState;
        },
    },
});

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectTotalItems = (state: RootState) =>
    state.cart.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
    );

export const selectTotalPrice = (state: RootState) =>
    state.cart.items.reduce(
        (total: number, item: CartItem) => total + item.product.price * item.quantity,
        0
    );
export const {addToCart, removeFromCart, updateQuantity, resetCart} = cartSlice.actions;
export default cartSlice.reducer;
