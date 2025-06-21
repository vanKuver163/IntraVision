'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {useGetStatusQuery, useReleaseStatusMutation} from "@/app/features/state/stateApi";


const AppContext = createContext<{
    isBusy: boolean;
    isCurrentUser: boolean;
    userId: string | null;
    releaseMachine: () => void;
}>({
    isBusy: false,
    isCurrentUser: false,
    userId: null,
    releaseMachine: () => {},
});

export const useAppContext = () => useContext(AppContext);

const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const { data: status, isLoading } = useGetStatusQuery(userId || '', {
        skip: !userId,
        pollingInterval: 10000,
    });
    const [triggerRelease] = useReleaseStatusMutation();

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const newUserId = generateUserId();
            localStorage.setItem('userId', newUserId);
            setUserId(newUserId);
        }
    }, []);

    const releaseMachine = async () => {
        if (!userId) return;
        try {
            await triggerRelease(userId).unwrap();
        } catch (error) {
            console.error('Release failed:', error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const cleanup = async () => {
            try {
                await releaseMachine();
            } catch (error) {
                if (isMounted) {
                    console.error('Cleanup release failed:', error);
                }
            }
        };
        return () => {
            isMounted = false;
            cleanup().catch(error => {
                if (isMounted) {
                    console.error('Cleanup error:', error);
                }
            });
        };
    }, [userId]);

    if (isLoading || !userId) {
        return <div>Загрузка...</div>;
    }

    return (
        <AppContext.Provider
            value={{
                isBusy: status?.isBusy || false,
                isCurrentUser: status?.isCurrentUser || false,
                userId,
                releaseMachine,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
