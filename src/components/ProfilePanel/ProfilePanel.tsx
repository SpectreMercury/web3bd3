// components/Profile.tsx
import React, {useEffect, useState} from 'react';
import {Button, Divider, Typography, Chip, IconButton, TextField} from '@mui/material';
import { Edit } from '@mui/icons-material';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import WalletIcon from '@mui/icons-material/Wallet';
import { kj, getRequest } from '@/lib/api';
import styles from './index.module.scss'
import { useWallet } from "@/contexts/WalletContext";



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

const ProfilePanel: React.FC<ProfileProps> = ({
     title,
     isEditable,
     projectName,
     chips,
     address,
     websiteURL,
     twitterName,
     projectDescription,
     videoTitle,
     videoContent,
     partnerImpression,
    path
 }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentData, setCurrentData] = useState({
        title,
        isEditable,
        projectName,
        chips,
        address,
        websiteURL,
        twitterName,
        projectDescription,
        videoTitle,
        videoContent,
        partnerImpression,
    });
    const [newChip, setNewChip] = useState('');
    const { walletAddress } = useWallet()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddChip = () => {
        if (newChip) {
            setCurrentData(currentData => ({
                ...currentData,
                chips: [...currentData.chips, newChip]
            }));
            setNewChip('');
        }
    };

    useEffect(() => {

        const fetchProfileData = async () => {
            const response = await fetch(`https://api.web3bd.network/api/profile?addr=${walletAddress}`)
            const data = await response.json();
            // setProfileData(data);
        };

        if (!walletAddress) {
            return
        } else {
            fetchProfileData();
        }

    }, [walletAddress])

    useEffect(() => {
        if (path === 'profile') {
           setIsEditing(false)
        }
    }, [])

    return (
        <div className={styles.profilePanelContainer}>
            <div className={styles.ProfileHeaderItem}>
                <Typography variant="h4" color="text.secondary">
                    {title}
                </Typography>
                {isEditable && (

                    <Button onClick={() => {setIsEditing(true)}} color="primary" variant="outlined" size="small"> Edit</Button>
                )}
            </div>
            <Divider />
            {isEditing ? (
                <>
                    <TextField
                        value={currentData.projectName}
                        name={'projectName'}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    <div>
                        {currentData.chips.map((chip, index) => (
                            <Chip className={styles.chips} key={index} label={chip} variant="outlined" />
                        ))}
                    </div>
                    <TextField
                        value={currentData.address}
                        name={'address'}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField
                        value={currentData.websiteURL}
                        name={'websiteURL'}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    <TextField
                        value={currentData.twitterName}
                        name={'twitterName'}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    <Divider />
                    <TextField
                        value={currentData.projectDescription}
                        name={'projectDescriptions'}
                        onChange={handleInputChange}
                        multiline
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    <Divider />
                    <TextField
                        value={currentData.videoTitle}
                        name={'videoTitle'}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                    />
                    {/*<video src={'https://assets.mixkit.co/videos/preview/mixkit-a-young-influencer-rides-a-giant-rubber-duck-in-a-50475-large.mp4'}></video>*/}
                    <div className={styles.ButtonContainer}>
                        <Button variant="outlined" color="primary">Confirm</Button>
                        <Button variant="contained" color="primary">Cancel</Button>
                    </div>
                </>
            ) : (
                <>
                    <Typography color="text.secondary" variant="h6">{currentData.projectName}</Typography>
                    <div>
                        {currentData.chips.map((chip, index) => (
                            <Chip className={styles.chips} key={index} label={chip} variant="outlined" />
                        ))}
                    </div>
                    <div className={styles.ProfileDetailItem}>
                        <WalletIcon />
                        <Typography color="text.secondary" variant="body2">{currentData.address}</Typography>
                    </div>

                    <div className={styles.ProfileDetailItem}>
                        <LanguageRoundedIcon />
                        <Typography color="text.secondary">{currentData.websiteURL}</Typography>
                    </div>

                    <div className={styles.ProfileDetailItem}>
                        <TwitterIcon />
                        <Typography color="text.secondary">{currentData.twitterName}</Typography>
                    </div>
                    <Typography color="text.secondary">{currentData.projectDescription}</Typography>
                    <Divider />
                    <Typography color="text.secondary" variant="h6">{currentData.videoTitle}</Typography>
                    <video src={currentData.videoContent}></video> {/* 这里可以根据需要替换为视频组件 */}
                </>
            )}
            <Divider />
            <Typography color="text.secondary" variant="h6">{currentData.partnerImpression}</Typography>
            <div>
                {currentData.chips.map((chip, index) => (
                    <Chip className={styles.chips} key={index} label={chip} variant="outlined" />
                ))}
            </div>
        </div>
    );
};

export default ProfilePanel;
