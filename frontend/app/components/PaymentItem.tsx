import {NumberInput} from "@/app/components/NumberInput";
import {CoinItem} from "@/app/features/coin/type";
import {selectCoinsByDenomination, updateQuantity} from "@/app/features/coin/coinSlice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/app/hooks";



interface PaymentItemProps {
    coinItem: CoinItem;
}

export const PaymentItem = ({coinItem}: PaymentItemProps) => {
    const dispatch = useDispatch();
    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateQuantity(coinItem.coin.id, quantity));
    };
    const sum = useAppSelector(selectCoinsByDenomination(coinItem.coin.denomination))

    return (
        <tr className="align-top">
            <td className="px-2 py-2 md:px-4">
                <div className="flex items-center w-full">
                    <div className="min-w-[60px] w-14 h-14 md:w-20 md:h-20 aspect-square bg-gray-300 border-2 border-black rounded-full flex-none flex items-center justify-center">
                        <p className="text-lg md:text-2xl font-semibold">{coinItem.coin.denomination}</p>
                    </div>
                    <p className="ml-2 md:ml-4 py-2 text-left font-semibold">
                        {coinItem.coin.denomination} {coinItem.coin.denomination === 1 ? 'рубль' :
                        coinItem.coin.denomination < 5 ? 'рубля' : 'рублей'}
                    </p>
                </div>
            </td>
            <td className="px-2 py-2 align-middle">
                <NumberInput
                    id={coinItem.coin.id}
                    value={coinItem.quantity}
                    min={0}
                    max={null}
                    onChangeAction={handleUpdateQuantity}
                />
            </td>
            <td className="px-2 py-2 md:px-4 text-left font-semibold whitespace-nowrap align-middle">
                {sum} руб.
            </td>
        </tr>
    )
}
