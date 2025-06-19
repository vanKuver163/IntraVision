import React from "react";

export const PaymentTable = () => {
   

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
                {/*<tbody>*/}
                {/*{*/}
                {/*    orderItems.map((orderItem) => (<OrderItem key={orderItem.product.id} orderItem={orderItem}/>))}*/}
                {/*</tbody>*/}
            </table>
            <div className="w-full my-6 ">
                <hr className=" w-full border-gray-300"/>
            </div>
        </div>
    )
}
