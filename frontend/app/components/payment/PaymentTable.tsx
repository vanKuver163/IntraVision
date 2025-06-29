'use client'
import React, {useEffect} from "react";
import {useGetCoinsQuery} from "@/app/features/payment/paymentApi";
import {PaymentItem} from "@/app/components/payment/PaymentItem";
import {useDispatch} from "react-redux";
import {addToBank, selectCoinItems} from "@/app/features/coin/coinSlice";
import {useAppSelector} from "@/app/hooks";


export const PaymentTable = () => {
    const dispatch = useDispatch();
    const {data: coins, isLoading, isError} = useGetCoinsQuery();
    const coinItems = useAppSelector(selectCoinItems);


    useEffect(() => {
        if(coins){
            coins.forEach(coin => dispatch(addToBank(coin)))
        }
    }, [coins]);

    if (isLoading) {
        return (
            <div className="w-full overflow-x-auto mt-4 flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3">Загрузка данных...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full overflow-x-auto mt-4 p-4 bg-red-100 text-red-700 rounded">
                Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300 flex-1">Номинал</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 flex-1">Количество</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300 flex-1 w-40">Сумма</th>
                </tr>
                </thead>
                <tbody>
                {
                    coinItems && coinItems.map((coinItem) => (<PaymentItem key={coinItem.coin.id} coinItem={coinItem}/>))
                }
                </tbody>
            </table>
            <div className="w-full my-6 ">
                <hr className=" w-full border-gray-300"/>
            </div>
        </div>
    )
}
