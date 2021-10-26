import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FA02DC',
        },
        secondary: {
            main: '#757575',
        },
        success: {
            main: '#28a745',
        },
        info: {
            main: '#17a2b8',
        },
        warning: {
            main: '#ffc107',
        },
        error: {
            main: '#dc3545',
        },
        text: {
            primary: "#212529",
            secondary: "#424242"
        }
    },

    typography: {
        fontFamily: "'Montserrat', sans-serif",
    }
});

export default theme