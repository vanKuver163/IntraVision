import {Product} from "@/app/features/product/type";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {addToCart, selectCartItems} from "@/app/features/cart/cartSlice";
import {useAppSelector} from "@/app/hooks";

interface ProductItemsProps {
    product: Product;
}

export const ProductItems = ({product}: ProductItemsProps) => {
    const dispatch = useDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.imagePath}`;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const isInCart = cartItems.some(item => item.product.id === product.id);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-2 border-gray-300 border-2 p-4">
            <div className="relative w-full h-48 mb-3">
                <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                />
            </div>
            <p className="font-semibold">{product.name}</p>
            <p>{product.brand.name}</p>
            <p>{product.price} руб.</p>
            <button
                onClick={handleAddToCart}
                disabled={isInCart || product.quantity == 0}
                className={`w-full p-2 transition-colors ${
                    product.quantity === 0
                        ? 'bg-gray-400 text-black cursor-default'
                        : isInCart
                            ? 'bg-[#6aa84f] text-white cursor-default'
                            : 'bg-[#f1c232] hover:bg-yellow-500 cursor-pointer'
                }`}
            >
                <p className="font-semibold">
                    {product.quantity === 0
                        ? 'Закончился'
                        : isInCart
                            ? 'Выбрано'
                            : 'Выбрать'
                    }
                </p>
            </button>
        </div>
    )
}
