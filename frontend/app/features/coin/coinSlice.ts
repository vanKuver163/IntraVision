import {CoinItem, CoinState} from "@/app/features/coin/type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Coin} from "@/app/features/payment/type";
import {RootState} from "@/app/store/store";

const initialState: CoinState = {
    items: [],
};

const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        addToBank: {
            reducer: (state, action: PayloadAction<CoinItem>) => {
                const existingItem = state.items.find(
                    item => item.coin.id === action.payload.coin.id
                );
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
            },
            prepare: (coin: Coin) => ({
                payload: {
                    coin,
                    quantity: 0,
                },
            }),
        },
        updateQuantity: {
            reducer: (
                state,
                action: PayloadAction<{ id: number; quantity: number }>
            ) => {
                const item = state.items.find(item => item.coin.id === action.payload.id);
                if (item) {
                    item.quantity = action.payload.quantity;
                }
            },
            prepare: (id: number, quantity: number) => ({
                payload: {id, quantity},
            }),
        },
        resetBank: (state) => {
            return initialState;
        },
    },
});

export const selectCoinItems = (state: RootState) => state.coin.items;

export const selectTotalSumCoin = (state: RootState) =>
    state.coin.items.reduce(
        (total: number, item: CoinItem) => total + item.coin.denomination * item.quantity,
        0
    );

export const selectCoinsByDenomination = (denomination: number) =>
    (state: RootState) =>
        state.coin.items
            .filter(item => item.coin.denomination === denomination)
            .reduce((sum, item) => sum + item.quantity*denomination, 0);


export const { addToBank, updateQuantity, resetBank } = coinSlice.actions;
export default coinSlice.reducer;


