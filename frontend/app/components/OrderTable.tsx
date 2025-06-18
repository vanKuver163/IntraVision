'use client'
import {useAppSelector} from "@/app/hooks";
import {selectCartItems} from "@/app/features/cart/cartSlice";
import {OrderItem} from "@/app/components/OrderItem";

export const OrderTable = () => {
    const orderItems = useAppSelector(selectCartItems);

    return (
        <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Товар</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Количество</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300">Цена</th>
                    <th className="px-4 py-2 text-left border-b border-gray-300"></th>
                </tr>
                </thead>
                <tbody>
                {
                    orderItems.map((orderItem) => (<OrderItem key={orderItem.product.id} orderItem={orderItem}/>))}
                </tbody>
            </table>
        </div>
    )
}
