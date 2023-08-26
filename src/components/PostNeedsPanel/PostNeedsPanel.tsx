import React, { useState, useEffect, SyntheticEvent } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    TextFieldProps,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Input,
    Divider,
    TextField, Avatar, Snackbar, Alert
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RefreshIcon from '@mui/icons-material/Refresh';
// import {aronInstance, kjInstance} from "@/lib/api";
import {AxiosResponse, AronApiResponse, AronDataArray } from '@/Types/aronInterface'
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Skeleton } from '@mui/material';
import Link from "next/link";
import {useWallet} from "@/contexts/WalletContext";
import styles from './index.module.scss';
import './date.scss'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const PostNeedsPanel: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMatchExpanded, setIsMatchExpanded] = useState(false)
    const [cryptoList, setCryptoList] = useState<string[]>(['USDT', 'USDC', 'ETH'])
    const [crypto, setCrypto] = useState<string[]>(['USDT']);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [hours, setHours] = useState<string>('');
    const [minutes, setMinutes] = useState<string>('');
    const [value, setValue] = React.useState<Dayjs | null>(null);
    const [dataFromAron, setDataFromAron] = useState<AronDataArray>([]);
    const [dataFromKj, setDataFromKj] = useState(null);
    const [errorOpen, setErrorOpen] = useState<boolean>(false);
    const [desc, setDesc] = useState("")
    const [matchRlt, setMatchResult] = useState(false)
    const { walletAddress } = useWallet()

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setCrypto(event.target.value as string[]);
    };

    const handleClose = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };


    const fetchDataFromAron = async () => {

        // if(!desc || !walletAddress) {
        //     setErrorOpen(true)
        //     return
        // }
        // try {
        //     const response = await aronInstance.get<AronApiResponse>(`/recommend/list?item=${desc}&walletAddress=${walletAddress}`);
        //     setDataFromAron(response.data.data);
        //     setMatchResult(true)
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }

        setMatchResult(true)
    }



    return (
        <>
            <Box
                className={styles.collapsePanel}
            >
                <Snackbar
                    open={errorOpen}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity="error" variant="filled">
                        Miss message
                    </Alert>
                </Snackbar>
                <div className={styles.titleContainer} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
                    One-click BD
                </div>

                {isExpanded && (
                    <>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            We will recommend some Projects to you by your tag, profile, Need.
                        </Typography>
                        <div className={styles.requirementsContainer}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                BD Requirements
                            </Typography>
                            <Typography variant="overline" color="text.secondary">
                                Send your information card to those projects who can post  your information card on X(twitter).
                            </Typography>
                        </div>
                        <div className={styles.requirementsContainer}>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                BD Offer
                            </Typography>
                            <div className={styles.cryptoChangeContainer}>
                                <FormControl className={styles.cryptoTypeSelector} sx={{ m: 1, width: 300 }}>

                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={crypto}
                                        onChange={handleChange}
                                        MenuProps={MenuProps}
                                        input={
                                            <OutlinedInput
                                                notched={false}
                                                style={{ border: 0 }}
                                            />
                                        }
                                    >
                                        {cryptoList.map((coin) => (

                                            <MenuItem
                                                key={coin}
                                                value={coin}
                                            >
                                                {coin}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Input
                                    className={styles.cryptoTypeInput}
                                    disableUnderline
                                    placeholder="0.0"
                                />
                            </div>
                            <Typography variant="overline">
                                Please introduce your project
                            </Typography>
                            <TextField
                                label="项目介绍"
                                variant="outlined"
                                fullWidth
                                placeholder="Introduce your project"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <Divider />
                            <p className={styles.bolderFont}>
                                Expiration time <span>(optional)</span>
                            </p>
                            <Box display="flex" gap={2} className={`post-message-data-container`}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField
                                    type="number"
                                    label="Hours"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    InputProps={{ endAdornment: <span>时</span> }} // 添加单位
                                    inputProps={{ min: "0", max: "24", step: "1" }}
                                />
                                <TextField
                                    type="number"
                                    label="Minutes"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    InputProps={{ endAdornment: <span>分</span> }} // 添加单位
                                    inputProps={{ min: "0", max: "60", step: "1" }}
                                />
                            </Box>
                        </div>
                        <Button onClick={fetchDataFromAron} className={styles.PostNeedsButton} variant="contained" color="primary">
                            GO to BD by one-click!
                        </Button>
                        {
                            matchRlt && (
                                <>
                                    <div className={styles.SuggestionContainer}>
                                        <Typography variant="h6" gutterBottom>
                                            BD Offer
                                        </Typography>
                                        <RefreshIcon className={styles.refreshBtn}/>
                                        <div className={styles.suggestionList}>
                                            {dataFromAron.length === 0 ? (
                                                // Display skeleton screen if data is not loaded
                                                Array.from(new Array(4)).map((_, index) => (
                                                    <Skeleton key={index} variant="circular" width={40} height={40} />
                                                ))
                                            ) : (
                                                // Display actual avatars once data is loaded
                                                dataFromAron.map(item => (
                                                    <div key={item.walletAddress} className={styles.Item}>
                                                        <Link href={`/${item.walletAddress}`}>
                                                            <Avatar src={item.avatar} />
                                                        </Link>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    <Button onClick={fetchDataFromAron} className={styles.PostNeedsButton}  variant="contained" color="primary">
                                        GO to BD by one-click!
                                    </Button>
                                </>
                            )
                        }
                    </>
                )}
            </Box>
            <Box
                className={styles.collapsePanel}
            >
                <div className={styles.titleContainer} onClick={() => setIsMatchExpanded(!isMatchExpanded)}>
                    {isExpanded ? <ArrowDropUp /> : <ArrowDropDown />}
                    Post Your Needs
                </div>

                {isMatchExpanded && (
                    <>
                        <Typography variant="body2" gutterBottom>
                            We will recommend some Projects to you by your tag, profile, Need.
                        </Typography>
                        <div className={styles.requirementsContainer}>
                            <Typography variant="h6" gutterBottom>
                                BD Requirements
                            </Typography>
                            <Typography variant="overline">
                                lease input your needs: <br/>
                                Reference: <br/>
                                Send your information card to those projects who can post  your information card on X(twitter). <br/>
                                Verify your project’s info. <br/>
                                Set partnership with them. <br/>
                            </Typography>
                        </div>
                        <div className={styles.requirementsContainer}>
                            <Typography variant="h6" gutterBottom>
                                BD Offer
                            </Typography>
                            <div className={styles.cryptoChangeContainer}>
                                <FormControl className={styles.cryptoTypeSelector} sx={{ m: 1, width: 300 }}>

                                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={crypto}
                                        onChange={handleChange}
                                        MenuProps={MenuProps}
                                        input={
                                            <OutlinedInput
                                                notched={false}
                                                style={{ border: 0 }}
                                            />
                                        }
                                    >
                                        {cryptoList.map((coin) => (

                                            <MenuItem
                                                key={coin}
                                                value={coin}
                                            >
                                                {coin}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Input
                                    className={styles.cryptoTypeInput}
                                    disableUnderline
                                    placeholder="0.0"
                                />
                            </div>
                            <Typography variant="overline">
                                Please input your offer except fund
                            </Typography>
                            <Divider />
                            <p className={styles.bolderFont}>
                                Expiration time <span>(optional)</span>
                            </p>
                            <Box display="flex" gap={2} className={`post-message-data-container`}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField
                                    type="number"
                                    label="Hours"
                                    value={hours}
                                    onChange={(e) => setHours(e.target.value)}
                                    InputProps={{ endAdornment: <span>时</span> }} // 添加单位
                                    inputProps={{ min: "0", max: "24", step: "1" }}
                                />
                                <TextField
                                    type="number"
                                    label="Minutes"
                                    value={minutes}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    InputProps={{ endAdornment: <span>时</span> }} // 添加单位
                                    inputProps={{ min: "0", max: "60", step: "1" }}
                                />
                            </Box>

                        </div>
                        <Button className={styles.PostNeedsButton}  variant="contained" color="primary">
                            Post
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}

export default PostNeedsPanel;
