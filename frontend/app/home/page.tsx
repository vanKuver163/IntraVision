'use client'
import React, {useState} from "react";
import {SelectBrand} from "@/app/components/SelectBrand";
import {PriceSlider} from "@/app/components/PriceSlider";
import {ButtonPanel} from "@/app/components/ButtonPanel";
import {ProductsList} from "@/app/components/ProductsList";
import {useGetProductsQuery} from "@/app/features/product/productApi";

const HomePage = () => {
    const [filters, setFilters] = useState<{
        brandId?: number;
        minPrice?: number;
    }>({});
    const [prevBrandId, setPrevBrandId] = useState<number | null>(null);
    const {data: products, isLoading} = useGetProductsQuery(filters);

    const handleBrandSelect = (newBrandId: number | null) => {
        setFilters(prev => {
            const currentBrandId = prev.brandId;
            setPrevBrandId(currentBrandId ?? null);
            const shouldResetPrice = currentBrandId !== newBrandId;
            return {
                brandId: newBrandId || undefined,
                minPrice: shouldResetPrice ? undefined : prev.minPrice
            };
        });
    };

    const handlePriceChange = (price: number | null) => {
        setFilters(prev => ({
            ...prev,
            minPrice: price ?? undefined
        }));
    };

    return (
        <div className="w-full border-2 border-black flex flex-col items-start justify-start p-4 ">
            <div className="w-full flex flex-row items-end justify-center">
                <div className="flex-1 flex-col items-center justify-center">
                    <SelectBrand selectedBrand={filters.brandId ?? null}
                                 onBrandSelectAction={handleBrandSelect}/>
                </div>
                <div className="flex-1 flex-col items-center justify-center">
                    <PriceSlider
                        initialPrice={filters.minPrice ?? 0}
                        onPriceChangeAction={handlePriceChange}
                        products={products || []}
                        selectedBrand={filters.brandId ?? null}
                        prevBrandId = {prevBrandId}
                    />
                </div>
                <div className="flex-1 flex-col items-center justify-center">
                    <ButtonPanel products={products || []} />
                </div>
            </div>
            <div className="w-full my-6 px-4">
                <hr className=" w-full opacity-50"/>
            </div>
            <div className="w-full px-4">
                {isLoading ? (
                    <div>Загрузка...</div>
                ) : (
                    <ProductsList products={products || []}/>
                )}
            </div>
        </div>
    )
}

export default HomePage


