'use client'
import * as XLSX from 'xlsx';
import {Product} from "@/app/features/product/type";
import {useAppSelector} from "@/app/hooks";
import {selectTotalItems, selectTotalPrice} from "@/app/features/cart/cartSlice";
import Link from "next/link";

interface ButtonPanelProps {
    products: Product[];
}

export const ButtonPanel = ({products}: ButtonPanelProps) => {
    const totalItems = useAppSelector(selectTotalItems);
    const totalPrice = useAppSelector(selectTotalPrice);

    const handleExportToExcel = () => {
        const data = products.map(product => ({
            'ID': product.id,
            'Название': product.name,
            'Бренд': product.brand?.name || '',
            'Цена': product.price,
            'Брэнд': product.brand.name || ''
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Товары");
        XLSX.writeFile(workbook, `Товары_${new Date().toLocaleDateString()}.xlsx`);
    };

    return (
        <div className=" w-full flex flex-col items-center justify-center px-4">
            <div className="w-full flex-1 flex-col items-center justify-center ">
                <button
                    onClick={handleExportToExcel}
                    disabled={products.length === 0}
                    className={`w-full bg-gray-300 p-2 rounded-xl cursor-pointer ${
                        products.length === 0 ? 'opacity-50' : 'hover:bg-gray-400'
                    } transition-colors`}
                >
                    <p className="text-black font-semibold">Экспорт в Excel</p>
                </button>
            </div>
            <div className="w-full flex-1 flex-col items-end justify-center mt-10">
                <Link href="/order" className="w-full">
                    <button
                        className="w-full bg-green-500 p-2 rounded-xl cursor-pointer hover:bg-green-600 transition-colors">
                        <p className="text-white font-semibold">
                            В корзине: {totalItems} товара на {totalPrice} руб.
                        </p>
                    </button>
                </Link>
            </div>
        </div>
    );
}
