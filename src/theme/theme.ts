"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(255, 0, 122)',
        },
        text: {
            primary: '#f2f2f2',
            secondary: '#f6f6f6'
        },
        action: {
            active: '#f2f2f2'
        },
        background: {
            paper: '#191B1F'
        },
        divider: '#f2f2f2',

    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#f2f2f2'
                }
            }
        }
    }
});

export default theme;
