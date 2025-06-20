'use client'
import React from "react";
import {OrderTable} from "@/app/components/OrderTable";
import {useAppSelector} from "@/app/hooks";
import {selectTotalPrice} from "@/app/features/cart/cartSlice";
import Link from "next/link";

const OrderPage = () => {
    const totalPrice = useAppSelector(selectTotalPrice);

    return (
        <div className="w-full flex flex-col items-start justify-start p-4 ">
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
                <div className="w-full flex flex-col items-center justify-center my-10">
                    <h1 className="text-xl text-black text-center font-semibold">У вас нет ни одного товара, вернитесь на страница каталога!</h1>
                </div>
            }
            <div className="w-full flex flex-row items-center justify-center gap-2 md:gap-4">
                <div className="flex-1 flex flex-col items-start">
                    <Link href="/home" className="p-2 w-full max-w-[300px] flex flex-row items-center justify-center bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-xl">
                            <p className="text-xl font-semibold">Вернуться</p>
                    </Link>
                </div>
                {totalPrice !== 0 &&
                    <div className="flex-1 flex flex-col items-end">
                        <Link href="/payment"  className="p-2 w-full flex flex-row items-center justify-center max-w-[300px] bg-green-500 hover:bg-green-600 cursor-pointer rounded-xl">
                            <p className="text-xl t text-white font-semibold">Оплата</p>
                        </Link>
                    </div>
                }
            </div>
        </div>

    )
}

export default OrderPage;
