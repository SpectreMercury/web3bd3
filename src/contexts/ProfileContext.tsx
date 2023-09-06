"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileProviderProps {
    children: ReactNode;
}

type ProfileProps = {
    title: string;
    isEditable: boolean; // 根据全局钱包地址和profile的地址判断
    projectName: string;
    chips: string[];
    address: string;
    websiteURL: string;
    twitterName: string;
    projectDescription: string;
    videoTitle: string;
    videoContent: string; // 这可以是一个视频URL或其他内容
    partnerImpression: string;
    path: string;
};

interface ProfileContextData {
    profile: ProfileProps | null;
    setProfile: React.Dispatch<React.SetStateAction<ProfileProps | null>>;
}

const ProfileContext = createContext<ProfileContextData | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileProps | null>(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
