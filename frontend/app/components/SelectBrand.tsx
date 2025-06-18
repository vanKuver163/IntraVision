'use client'
import React from "react";
import {useGetBrandsQuery} from "@/app/features/brand/brandApi";


interface SelectBrandProps {
    selectedBrand: number | null;
    onBrandSelectAction: (id: number | null) => void;
}

export const SelectBrand = ({
                                selectedBrand,
                                onBrandSelectAction
                            }: SelectBrandProps) => {
    const {data: brands, isLoading} = useGetBrandsQuery();


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value ? Number(e.target.value) : null;
        onBrandSelectAction(id);
    };

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div className="w-full px-4">
            <div className="w-full flex flex-col items-start justify-center">
                <h1 className="text-2xl text-start font-bold">Газированные напитки</h1>
            </div>
            <div className="w-full flex flex-col items-start justify-center mt-6">
                <label htmlFor="brand-select">Выберите бренд:</label>
                <select
                    id="brand-select"
                    value={selectedBrand || ''}
                    onChange={handleChange}
                    className="form-control"
                    disabled={isLoading}
                >
                    <option value="">Все бренды</option>
                    {brands?.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
