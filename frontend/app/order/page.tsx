'use client'
import React from "react";
import {OrderTable} from "@/app/components/OrderTable";
import {useAppSelector} from "@/app/hooks";
import {selectTotalPrice} from "@/app/features/cart/cartSlice";
import Link from "next/link";

const OrderPage = () => {
    const totalPrice = useAppSelector(selectTotalPrice);

    return (
        <div className="w-full border-2 border-black flex flex-col items-start justify-start p-4 ">
            <div className="w-full flex flex-col items-start justify-center">
                <h1 className="text-2xl text-start font-bold">Оформление заказа</h1>
            </div>
            {totalPrice !== 0 ?
                <>
                    <OrderTable/>
                    <div className="w-full flex flex-col items-end justify-center p-4 ">
                        <p className="text-xl font-semibold">Итоговая сумма: {totalPrice} руб.</p>
                    </div>
                </>
                :
                <div className="w-full flex flex-col items-center justify-center my-6">
                    <h1 className="text-3xl text-black font-semibold">Корзина пуста</h1>
                </div>
            }
            <div className="w-full flex flex-row items-center justify-center gap-2 md:gap-4">
                <div className="flex-1">
                    <Link href="/home" className="w-full">
                        <button
                            className="p-2 w-full max-w-[200px] bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-xl">
                            <p className="text-sm font-semibold">Вернуться</p>
                        </button>
                    </Link>
                </div>
                {totalPrice !== 0 &&
                    <div className="flex-1 flex flex-col items-end">
                        <button
                            className="p-2 w-full max-w-[200px] bg-green-500 hover:bg-green-600 cursor-pointer rounded-xl">
                            <p className="text-sm text-white font-semibold">Оплата</p>
                        </button>
                    </div>
                }
            </div>
        </div>

    )
}

export default OrderPage;
