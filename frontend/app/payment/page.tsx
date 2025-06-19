import React from "react";
import {PaymentTable} from "@/app/components/PaymentTable";

const PaymentPage = () => {
    return (
        <div className="w-full border-2 border-black flex flex-col items-start justify-start p-4 ">
            <div className="w-full flex flex-col items-start justify-center">
                <h1 className="text-2xl text-start font-bold">Оплата</h1>
            </div>
            <PaymentTable />
        </div>
    )
}

export default  PaymentPage;
