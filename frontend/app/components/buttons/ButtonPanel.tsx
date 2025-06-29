'use client'
import * as XLSX from 'xlsx';
import {Product, ProductImportData} from "@/app/features/product/type";
import {useAppSelector} from "@/app/hooks";
import {selectTotalItems} from "@/app/features/cart/cartSlice";
import Link from "next/link";
import {useImportProductsMutation} from "@/app/features/product/productApi";

interface ButtonPanelProps {
    products: Product[];
}

interface ExcelProduct {
    Name: string;
    Price: number;
    Quantity: number;
    ImagePath?: string;
    Brand: string;
}

export const ButtonPanel = ({products}: ButtonPanelProps) => {
    const totalItems = useAppSelector(selectTotalItems);
    const [importProducts, { isLoading}] = useImportProductsMutation();

    // const handleExportToExcel = () => {
    //     const data = products.map(product => ({
    //         'ID': product.id,
    //         'Название': product.name,
    //         'Бренд': product.brand?.name || '',
    //         'Цена': product.price,
    //     }));
    //
    //     const workbook = XLSX.utils.book_new();
    //     const worksheet = XLSX.utils.json_to_sheet(data);
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Товары");
    //     XLSX.writeFile(workbook, `Товары_${new Date().toLocaleDateString()}.xlsx`);
    // };

    const handleImportFromExcel = async () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.xlsx, .xls';
            input.style.display = 'none';

            input.onchange = async (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (!file) return;

                try {
                    const data = await file.arrayBuffer();
                    const workbook = XLSX.read(data);

                    if (workbook.SheetNames.length === 0) {
                        alert('Файл не содержит ни одного листа');
                        return;
                    }

                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json<ExcelProduct>(worksheet);

                    const productsToImport: ProductImportData[] = jsonData
                        .map((item, index) => {
                            // Базовые проверки
                            if (!item.Name || !item.Brand || isNaN(Number(item.Price))) {
                                console.warn(`Пропущена строка ${index + 2}: невалидные данные`);
                                return null;
                            }

                            return {
                                name: item.Name.toString().trim(),
                                price: Number(item.Price),
                                quantity: Number(item.Quantity) || 0,
                                imagePath: item.ImagePath?.toString().trim() || '',
                                brand: item.Brand.toString().trim()
                            };
                        })
                        .filter(Boolean) as ProductImportData[];

                    if (productsToImport.length === 0) {
                        alert('Нет валидных данных для импорта');
                        return;
                    }

                    try {
                        const result = await importProducts(productsToImport).unwrap();
                        if (result.successCount > 0) {
                            alert(`Успешно импортировано ${result.successCount} товаров`);
                        }
                        if (result.errorCount > 0) {
                            alert(`${result.errorCount} товаров не были обработаны`);
                        }
                    } catch (err) {
                        console.error("Ошибка API:", err);
                        alert('Ошибка при отправке данных на сервер');
                    }

                } catch (error) {
                    console.error('Ошибка обработки файла:', error);
                    alert('Некорректный формат файла');
                } finally {
                    document.body.removeChild(input);
                }
            };

            document.body.appendChild(input);
            input.click();

        } catch (error) {
            console.error('Неожиданная ошибка:', error);
            alert('Произошла непредвиденная ошибка');
        }
    };

    return (
        <div className=" w-full flex flex-col items-center justify-center px-4">
            <div className="w-full flex-1 flex-col items-center justify-center ">
                <button
                    onClick={handleImportFromExcel}
                    disabled={products.length === 0}
                    className={`w-full bg-[#cccccc] p-2 cursor-pointer ${
                        products.length === 0 ? 'opacity-50' : 'hover:bg-gray-400'
                    } transition-colors`}
                >
                    {isLoading ?
                        <p className="text-black font-semibold">Идет загрузка...</p> :
                        <p className="text-black font-semibold">Импорт</p>}
                </button>
            </div>
            <div className="w-full flex-1 flex-col items-end justify-center mt-10">
                <Link href="/order" className="w-full">
                    <button
                        disabled={totalItems === 0}
                        className={`w-full bg-[#6aa84f] p-2 transition-colors ${
                            totalItems === 0
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer hover:bg-green-600'
                        }`}
                    >
                        <p className="text-white font-semibold">
                            Выбрано: {totalItems}
                        </p>
                    </button>
                </Link>
            </div>
        </div>
    );
}
