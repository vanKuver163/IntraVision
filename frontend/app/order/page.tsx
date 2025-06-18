import React from "react";
import {OrderTable} from "@/app/components/OrderTable";

const OrderPage = () => {
    return (
        <div className="w-full border-2 border-black flex flex-col items-start justify-start p-4 ">
            <div className="w-full flex flex-col items-start justify-center">
                <h1 className="text-2xl text-start font-bold">Оформление заказа</h1>
            </div>
            <OrderTable />
        </div>
    )
}

export default OrderPage;
