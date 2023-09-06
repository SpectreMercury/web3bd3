import React, { ReactNode } from 'react';
import { WalletProvider } from './WalletContext';
import { ProfileProvider } from './ProfileContext';
import { WebSocketProvider } from "./WebsocketContext";

interface CombinedProvidersProps {
    children: ReactNode;
}

const ApplyProviders: React.FC<CombinedProvidersProps> = ({ children }) => {
    return (
        <WalletProvider>
            <ProfileProvider>
                <WebSocketProvider>
                    {children}
                </WebSocketProvider>
            </ProfileProvider>
        </WalletProvider>
    );
};

export default ApplyProviders;
