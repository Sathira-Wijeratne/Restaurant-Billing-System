import { createTheme } from "@mui/material";

// Create a custom theme with restaurant colors
const restaurantTheme = createTheme({
    palette: {
        primary: {
            main: '#8D2B0B', // Warm brick red - classic restaurant color
            light: '#B23C17',
            dark: '#6A1F07',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#1B5E20', // Forest green for accent
            light: '#43A047',
            dark: '#003D00',
            contrastText: '#FFF'
        },
        background: {
            default: '#FFF8E1', // Warm cream background
            paper: '#FFFFFF',
        },
        text: {
            primary: '#2C2C2C',
            secondary: '#5F5F5F'
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 3px 15px rgba(0,0,0,0.08)',
                    borderRadius: 8,
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 'bold',
                    backgroundColor: '#F5EBD5', // Warm beige table header
                    color: '#5F4B32',
                }
            }
        }
    }
});

export default restaurantTheme;
