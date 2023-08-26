"use client"

import React, { useState } from 'react';
import styles from './index.module.scss'
import Typography from "@mui/material/Typography";
import ProfilePanel from "@/components/ProfilePanel/ProfilePanel";
import partnersData from "@/data/partner";
import Partnership from "@/components/PartnerPanel/PartnerPanel";
import needs from "@/data/needs";
import NeedsPanel from "@/components/NeedsPanel/NeedsPanel";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const InfoPage: React.FC = () => {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTabIndex(newValue);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img className={styles.InfoAvatar} src="https://bafkreidikblyoq2ygzrlc24hql3swlruicc5o6nj7ce4n2hizgleocjjau.ipfs.nftstorage.link/" alt="Avatar"/>
                <Typography variant="h4" color="text.secondary">BD3</Typography>

                <Tabs value={selectedTabIndex} onChange={handleTabChange} orientation="horizontal" variant="scrollable">
                    <Tab label="Profile" />
                    <Tab label="Partnership" />
                    <Tab label="Activities" />
                </Tabs>
            </div>
            <div>
                {selectedTabIndex === 0 && <ProfilePanel
                    title={'Img3'}
                    isEditable={true}
                    chips={['WIP', 'NFT']}
                    projectName={'Img3'}
                    address={'0x111'}
                    websiteURL={'https://github.com/lxdao-official/img3'}
                    twitterName={'https://twitter.com/Francis_404'}
                    projectDescription={'Img3 is an essential infrastructure in the Web3 storage field. It provides the easiest way for you to implement images rendering, uploading, etc. based on Web3 storage like IPFS.'}
                    videoTitle={'Show time'}
                    videoContent={'https://media.w3.org/2010/05/sintel/trailer.mp4'}
                    partnerImpression={'partner impression'}
                    path={'profile'}
                />}
                {selectedTabIndex === 1 && <Partnership partnerNum={100} partners={partnersData} />}
                {selectedTabIndex === 2 && <NeedsPanel needs={needs} currentPage={'info'}/>}
            </div>
        </div>
    );
};

export default InfoPage;
