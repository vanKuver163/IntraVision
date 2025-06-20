'use client'
import React from "react";
import {PaymentTable} from "@/app/components/PaymentTable";
import {useAppSelector} from "@/app/hooks";
import {resetCart, selectCartItems, selectTotalPrice} from "@/app/features/cart/cartSlice";
import {
    resetBank,
    selectCoinItems,
    selectTotalSumCoin
} from "@/app/features/coin/coinSlice";
import Link from "next/link";
import {useMakePaymentMutation} from "@/app/features/payment/paymentApi";
import {useDispatch} from "react-redux";
import { useRouter } from 'next/navigation';
import {addToChange} from "@/app/features/coin/changeSlice";


const PaymentPage = () => {
    const [makePayment, {data, error, isLoading}] = useMakePaymentMutation();
    const router = useRouter();
    const dispatch = useDispatch();
    const totalPrice = useAppSelector(selectTotalPrice);
    const totalSumCoin = useAppSelector(selectTotalSumCoin);
    const order = useAppSelector(selectCartItems);
    const payment = useAppSelector(selectCoinItems);


    const handlePayment = async () => {
        try {
            const result = await makePayment({
                payment: payment,
                order: order
            });
            if ('error' in result) {
                console.error('Ошибка оплаты:', result.error);
                return;
            }

            const response = result.data;
            if (response.success) {
                dispatch(resetBank());
                dispatch(resetCart());
                response.change.forEach((item) => {
                    dispatch(addToChange(item.coin, item.quantity));
                });
                console.log('Успешная оплата, сдача:', response.change);
                router.push('/completion');
            } else {
                console.error('Ошибка оплаты:');
            }
        } catch (err) {
            console.error('Непредвиденная ошибка:', err);
        }
    };

    return (
        <div className="w-full flex flex-col items-start justify-start p-4 ">
            <div className="w-full flex flex-col items-start justify-center">
                <h1 className="text-2xl text-start font-bold">Оплата</h1>
            </div>
            { totalPrice !== 0 ?
            <PaymentTable/> :
                <div className="w-full flex flex-col items-center justify-center my-10">
                <h1 className="text-2xl text-start font-bold">Вы не выбрали товар!</h1>
                </div>
            }
            <div className="w-full flex flex-row items-center justify-end p-4 ">
                <p className="text-xl font-semibold mr-10">Итоговая сумма: {totalPrice} руб.</p>
                <p className="text-xl font-semibold">
                    Вы внесли:
                    <span className={totalSumCoin < totalPrice ? 'text-red-500' : 'text-green-600'}>
      {' '}{totalSumCoin} руб.</span>
                </p>
            </div>
            <div className="w-full flex flex-row items-center justify-center gap-2 md:gap-4">
                <div className="flex-1 flex flex-col items-start">
                    <Link href="/order"
                          className="p-2 w-full max-w-[300px] flex flex-row items-center justify-center bg-yellow-400 hover:bg-yellow-500 cursor-pointer rounded-xl">
                        <p className="text-xl font-semibold">Вернуться</p>
                    </Link>
                </div>
                {totalPrice !== 0 &&
                    <div className="flex-1 flex flex-col items-end">
                        <button
                            className="p-2 w-full flex flex-row items-center justify-center max-w-[300px] bg-green-500 hover:bg-green-600 cursor-pointer rounded-xl"
                            onClick={handlePayment}>
                            <p className="text-xl t text-white font-semibold">Оплатить</p>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default PaymentPage;
