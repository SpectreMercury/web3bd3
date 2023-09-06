"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const WebSocketContext = createContext<WebSocket | null>(null);

interface WebSocketProviderProps {
    children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        // 创建 WebSocket 连接
        const websocket = new WebSocket('wss://api.web3bd.network/relay');

        websocket.onopen = () => {
            console.log('WebSocket opened');
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        websocket.onclose = (event) => {
            console.log(`WebSocket closed with code=${event.code}, reason=${event.reason}`);
        };

        setWs(websocket);

        // 清理函数：关闭 WebSocket 连接
        return () => {
            websocket.close();
        };
    }, []);

    return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};


export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
