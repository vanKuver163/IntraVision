import {useAppContext} from "@/app/context/AppContext";
import React from "react";


export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
    const { isBusy, isCurrentUser } = useAppContext();

    if (isBusy && !isCurrentUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-2xl font-bold mb-4">Извините, в данный момент автомат занят</h2>
                <p className="text-gray-600">Пожалуйста, попробуйте позже.</p>
            </div>
        );
    }

    return <>{children}</>;
};
