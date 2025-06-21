import {CartItem} from "@/app/features/cart/type";
import Image from "next/image";
import {BsTrash} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {removeFromCart, updateQuantity} from "@/app/features/cart/cartSlice";
import {NumberInput} from "@/app/components/NumberInput";

interface OrderItemsProps {
    orderItem: CartItem;
}

export const OrderItem = ({orderItem}: OrderItemsProps) => {
    const imageUrl = `https://localhost:5001${orderItem.product.imagePath}`
    const dispatch = useDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(orderItem.product.id));
    };
    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity(orderItem.product.id, quantity));
    };


    return (
        <tr>
            <td className="px-4 py-2">
                <div className="flex items-center w-full h-22">
                    <div className="relative h-full w-20 flex-shrink-0">
                        <Image
                            src={imageUrl}
                            alt={orderItem.product.name}
                            fill
                            className="object-contain"
                            unoptimized={true}
                        />
                    </div>
                    <p className="px-4 py-2 text-left flex-grow font-semibold">{orderItem.product.name}</p>
                </div>
            </td>
            <td >
                <NumberInput
                    id={orderItem.product.id}
                    value={orderItem.quantity}
                    min={1}
                    max={orderItem.product.quantity}
                    onChangeAction={handleUpdateQuantity}
                />
            </td>
            <td className="px-4 py-2 text-left font-semibold">{orderItem.product.price} руб.</td>
            <td className="px-4 py-2">
                <div className="flex items-center justify-end w-full ">
                    <button className="p-2 cursor-pointer hover:opacity-60"
                            onClick={handleRemoveFromCart}
                    >
                        <BsTrash className="text-xl"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}
