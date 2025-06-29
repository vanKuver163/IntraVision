import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import {ClientRootLayout} from "@/app/components/layouts/ClientRootLayout";


export const metadata: Metadata = {
    title: "Test project",
    description: "IntraVision test project",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <ClientRootLayout>
            {children}
        </ClientRootLayout>
        </body>
        </html>
    )
}
