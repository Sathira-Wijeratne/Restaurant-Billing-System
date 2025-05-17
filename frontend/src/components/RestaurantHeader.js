import { Box, Typography } from "@mui/material";
import { RestaurantMenu } from "@mui/icons-material";

const RestaurantHeader = () => {
    return (
        <Box sx={{
            width: '100%',
            bgcolor: '#8D2B0B',
            color: 'white',
            py: 1, // Reduced vertical padding
            px: 0,
            boxShadow: '0 4px 16px 0 rgba(141,43,11,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative',
        }}>
            <Box sx={{
                width: 44, // Compact logo size
                height: 44,
                bgcolor: '#FFF8E1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px 0 rgba(141,43,11,0.10)',
                mb: 0.7 // Reduced margin below logo
            }}>
                {/* Placeholder for logo - you can replace with an <img src=... /> if you have a logo */}
                <RestaurantMenu sx={{ fontSize: 26, color: '#8D2B0B' }} />
            </Box>
            <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: 2, mb: 0, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                Casa del Gusto
            </Typography>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Georgia, serif', opacity: 0.85, fontSize: { xs: '0.95rem', sm: '1.05rem' }, mt: 0 }}>
                Fine Dining & Exquisite Taste
            </Typography>
        </Box>
    );
};

export default RestaurantHeader;
