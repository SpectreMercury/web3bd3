"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#766aff',
        },
        text: {
            primary: '#272d37',
            secondary: '#5f6d7e'
        },
        action: {
            active: '#f2f2f2'
        },
        background: {
            paper: '#ffffff'
        },
        divider: '#f3f3f3',

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
