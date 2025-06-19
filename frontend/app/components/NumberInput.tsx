'use client'
import React, {useState, useEffect, useRef} from 'react';

interface NumberInputProps {
    id: number;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChangeAction: (id: number, value: number) => void;
}


export const NumberInput = ({
                                id,
                                value,
                                min = 1,
                                max = 100,
                                step = 1,
                                onChangeAction,
                            }: NumberInputProps) => {
    const [inputValue, setInputValue] = useState(value.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        if (/^\d*$/.test(val)) {
            const numValue = parseInt(val, 10) || min;
            onChangeAction(id, Math.min(Math.max(numValue, min), max));
        }
    };

    const handleBlur = () => {
        const numValue = parseInt(inputValue, 10) || min;
        const clampedValue = Math.min(Math.max(numValue, min), max);
        setInputValue(clampedValue.toString());
        onChangeAction(id, clampedValue);
    };

    const increment = () => {
        const newValue = Math.min(value + step, max);
        onChangeAction(id, newValue);
    };

    const decrement = () => {
        const newValue = Math.max(value - step, min);
        onChangeAction(id, newValue);
    };

    return (
        <div className="w-full flex flex-col items-start justify-center px-4">
            <div className='flex items-center border rounded-md overflow-hidden w-32'>
                <button
                    onClick={decrement}
                    disabled={value <= min}
                    className="flex items-center justify-center px-4 py-2 w-10  cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    -
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-12 text-center border-x outline-none px-2 py-2"
                    min={min}
                    max={max}
                    pattern="[0-9]*"
                />

                <button
                    onClick={increment}
                    disabled={value >= max}
                    className="flex items-center justify-center px-4 py-2 w-10 bg-gray-100 cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    +
                </button>
            </div>
        </div>
    )
}
