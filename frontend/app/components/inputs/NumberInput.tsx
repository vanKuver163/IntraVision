'use client'
import React, {useState, useEffect, useRef} from 'react';

interface NumberInputProps {
    id: number;
    value: number;
    min?: number;
    max?: number | null;
    step?: number;
    onChangeAction: (id: number, value: number) => void;
}


export const NumberInput = ({
                                id,
                                value,
                                min = 1,
                                max = null,
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
        if (val === '' || /^[0-9]+$/.test(val)) {
            setInputValue(val);

            if (val !== '') {
                const numValue = parseInt(val, 10);
                const upperLimit = max !== null ? Math.min(numValue, max) : numValue;
                onChangeAction(id, Math.max(upperLimit, min));
            }
        }
    };

    const handleBlur = () => {
        if (inputValue === '') {
            setInputValue(min.toString());
            onChangeAction(id, min);
            return;
        }
        const numValue = parseInt(inputValue, 10) || min;
        const upperLimit = max !== null ? Math.min(numValue, max) : numValue;
        const clampedValue = Math.max(upperLimit, min);
        setInputValue(clampedValue.toString());
        onChangeAction(id, clampedValue);
    };

    const increment = () => {
        const newValue = max !== null ? Math.min(value + step, max) : value + step;
        onChangeAction(id, newValue);
    };

    const decrement = () => {
        const newValue = Math.max(value - step, min);
        onChangeAction(id, newValue);
    };

    return (
        <div className="w-full flex flex-col items-start justify-center px-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={decrement}
                    disabled={value <= min}
                    className="flex items-center justify-center px-4 py-2 w-10 border border-gray-300 dark:border-gray-600 cursor-pointer text-white bg-black hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    -
                </button>

                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-20 text-center border border-gray-300 dark:border-gray-600 outline-none px-2 py-2 bg-white dark:bg-gray-800 dark:text-white"
                    inputMode="numeric"
                    min={min}
                    max={max || undefined}
                    pattern="[0-9]*"
                />

                <button
                    onClick={increment}
                    disabled={max !== null && value >= max}
                    className="flex items-center justify-center px-4 py-2 w-10 border border-gray-300 dark:border-gray-600 text-white bg-black hover:bg-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    +
                </button>
            </div>
        </div>
    )
}
