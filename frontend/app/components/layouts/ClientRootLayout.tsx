'use client';

import { Providers } from "@/app/provider";
import { RouteGuard } from "@/app/components/routing/RouteGuard";
import React from "react";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <RouteGuard>
                {children}
            </RouteGuard>
        </Providers>
    );
}
