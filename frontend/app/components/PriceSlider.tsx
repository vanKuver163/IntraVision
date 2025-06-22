'use client'
import React, {useEffect, useState} from "react";
import {Product} from "@/app/features/product/type";

interface SelectPriceProps {
    initialPrice?: number;
    onPriceChangeAction: (price: number | null) => void;
    products?: Product[];
    selectedBrand?: number | null
    prevBrandId: number | null
}


export const PriceSlider = ({
                                initialPrice = 0,
                                onPriceChangeAction,
                                products = [],
                                selectedBrand,
                                prevBrandId
                            }: SelectPriceProps) => {
    const [currentPrice, setCurrentPrice] = useState<number>(initialPrice);


    const { minPrice, maxPrice } = React.useMemo(() => {
        if(selectedBrand !== null) {
            let filteredProducts = products;

            if (selectedBrand) {
                filteredProducts = products.filter(p => p.brandId === selectedBrand);
            }

            const prices = filteredProducts.map(p => p.price);

            if (prices.length === 0) {
                setCurrentPrice(0);
                return {
                    minPrice: 0,
                    maxPrice: 0,
                };
            }

            setCurrentPrice(Math.min(...prices))
            return {
                minPrice: Math.min(...prices),
                maxPrice: Math.max(...prices)
            };
        }
        else{
            const prices = products.map(p => p.price);

            if (prices.length === 0) {
                return {
                    minPrice: 0,
                    maxPrice: 0,
                };
            }

            return {
                minPrice: 0,
                maxPrice: Math.max(...prices)
            };
        }
    }, [products, selectedBrand]);

    useEffect(() => {
        if(prevBrandId !== null && selectedBrand === null) setCurrentPrice(0)
    }, [selectedBrand, prevBrandId]);


    useEffect(() => {
        const timer = setTimeout(() => {
            onPriceChangeAction(currentPrice > 0 ? currentPrice : null);
        }, 500);

        return () => clearTimeout(timer);
    }, [currentPrice, onPriceChangeAction]);


    return (
        <div className="w-full px-4">
            <h3 className="mb-2">Стоимость:</h3>
            <div className="w-full flex flex-row items-center justify-center">
                <div className="flex-1">
                    <label>{currentPrice} руб.</label>
                </div>
                <div className="flex-1 text-right">
                    <label>{maxPrice} руб.</label>
                </div>
            </div>
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={currentPrice || minPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="slider"
            />
            <div className="slider-labels"/>
        </div>
    )
}
