import { colors, createTheme } from "@mui/material";
import { colorsCustom } from "./Colors";


export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1920,
            // xl: 1536,
        }
    },
    palette: {
        primary: {
            main: colorsCustom.general.principal,
        },
        secondary: {
            main: colorsCustom.general.secundario,
        },
        error: {
            main: colorsCustom.general.error,
        },

    },

    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
                focusRipple: false,
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'initial',
                    boxShadow: 'none !important',
                    borderRadius: 8,
                    minWidth: 90
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '& input[type=number]': {
                        '-moz-appearance': 'textfield'
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0
                    }
                },
            },
        },
    },
    typography: {
        fontFamily: "ContiSans",
        h1: {
            fontWeight: 500,
            fontSize: '35px',
            lineHeight: '40px',
        },
        h2: {
            fontWeight: 500,
            fontSize: '29px',
            lineHeight: '32px'
        },
        h3: {
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '28px'
        },
        h4: {
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '24px',
            fontFamily: 'ContiSans-Bold',
            color: colorsCustom.general.principal
        },
        h5: {
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '20px',
            fontFamily: 'ContiSans-Bold',
            color: colorsCustom.general.principal
        },
        h6: {
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '18px',
            color: colorsCustom.general.texto
        },
        subtitle1: {
            fontSize: '16px',
            lineHeight: '25px'
        },
        subtitle2: {
            fontWeight: 400,
            fontSize: '16px'
        },
        body1: {
            fontSize: '16px'
        },
        body2: {
            fontSize: '16px',
        },
        button: {
            fontSize: '16px',
        },
        caption: {
            fontSize: '12px'
        },
        overline: {
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase'
        }
    }
});

export const drawerWidth = 200;