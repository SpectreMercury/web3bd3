"use client";

import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import Link from 'next/link';
import {Button, IconButton, ListItemIcon, Menu, MenuItem} from '@mui/material';
import { Mail as MailIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import styles from './index.module.scss'

export default function Header() {
    const { walletAddress, setWalletAddress, setNetwork, network } = useWallet();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const disconnect = () => {
        setWalletAddress("")
        handleClose();
    }

    const handleConnectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // 请求用户账户地址
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const currentAccount = accounts[0];
                setWalletAddress(currentAccount);

                // 获取当前网络
                const networkId = await window.ethereum.request({ method: 'net_version' });
                setNetwork(networkId);
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            console.error("Ethereum object doesn't exist!");
        }
    };

    return (
        <header className={styles.HeaderWrapper}>
            <Link legacyBehavior href="/">
                <p className={styles.logoText}>

                </p>
            </Link>
            {!walletAddress && (
                <Button variant="contained" className={styles.connectBtn} color="primary" onClick={handleConnectWallet}>
                    Connect Wallet
                </Button>
            )}
            {walletAddress && (
                <div className={styles.LoginedWrapper} >
                            <Link href={'/postneeds'}>
                                <Button color="primary" variant="contained" className={styles.PostProjectButton}>
                                    Post Project
                                </Button>
                            </Link>


                    <Button color="primary" variant="outlined" onClick={handleClick}>
                        {`${walletAddress.substr(0, 4)}****${walletAddress.substr(walletAddress.length - 4, walletAddress.length - 1)}`}
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <Button color='primary' href="/profile" component={Link}>
                                    Home
                                </Button>
                            </MenuItem>

                        <MenuItem onClick={disconnect}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>

                            Disconnect
                        </MenuItem>
                    </Menu>

                    <IconButton>
                        <MailIcon />
                    </IconButton>
                </div>
            )}
        </header>
    );
}
