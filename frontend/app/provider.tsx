'use client'

import {Provider} from 'react-redux'
import {store} from "@/app/store/store";
import React from "react";
import {AppProvider} from "@/app/context/AppContext";


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AppProvider>
                {children}
            </AppProvider>
        </Provider>
    );
}
