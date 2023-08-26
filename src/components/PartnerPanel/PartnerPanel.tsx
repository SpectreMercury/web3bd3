import React from 'react';
import { Typography, Divider, Chip, Avatar, Box } from '@mui/material';
import { Partner, PartnershipProps } from "@/Types/Partner";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import ApiIcon from '@mui/icons-material/Api';
import GridViewIcon from '@mui/icons-material/GridView';
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';
import styles from './index.module.scss'

const Partnership: React.FC<PartnershipProps> = ({ partnerNum, partners }) => {
    const getIconForChip = (chip: string) => {
        switch (chip.toLowerCase()) {
            case 'wip':
                return <GroupWorkRoundedIcon />;
            case 'layer2':
                return <GridViewIcon />;
            case 'dao':
                return <GroupWorkRoundedIcon />;
            case 'social-fi':
                return <AlignHorizontalRightIcon />;
            case 'public goods':
                return <AccountBalanceIcon />;
            default:
                return <WorkspacesRoundedIcon />;
        }
    };
    return (
        <div className={styles.partnerContainer}>
            <Typography variant="h4" color="text.secondary">Partnership</Typography>
            <Divider />
            <Typography variant="h6" color="text.secondary">Partner num: {partnerNum}</Typography>
            <div className={styles.partnerItemContainer}>
                {partners.map((partner, index) => (
                    <Box className={styles.partnerItem} key={index} display="flex" alignItems="center" marginY={2}>
                        <Avatar src={partner.avatar} alt={partner.name} style={{ marginRight: '16px' }} />
                        <div>
                            <Typography variant="body1" color="text.secondary">{partner.name}</Typography>
                            <div>
                                {partner.chips.map((chip, chipIndex) => (
                                    <Chip
                                        size="small"
                                        key={chipIndex}
                                        label={chip}
                                        variant="outlined"
                                        style={{ marginRight: '8px' }}
                                        icon={getIconForChip(chip)}  // Add this line
                                    />
                                ))}
                            </div>
                        </div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default Partnership;
