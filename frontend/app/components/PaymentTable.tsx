'use client'
import React, {useEffect} from "react";
import {useGetCoinsQuery} from "@/app/features/payment/paymentApi";
import {PaymentItem} from "@/app/components/PaymentItem";
import {useDispatch} from "react-redux";
import {addToBank, selectCoinItems} from "@/app/features/coin/coinSlice";
import {useAppSelector} from "@/app/hooks";


export const PaymentTable = () => {
    const dispatch = useDispatch();
    const {data: coins, isLoading} = useGetCoinsQuery();
    const coinItems = useAppSelector(selectCoinItems);


    useEffect(() => {
        if(coins){
            coins.forEach(coin => dispatch(addToBank(coin)))
        }
    }, [coins]);


    return (
        <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Номинал</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Количество</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Сумма</th>
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
