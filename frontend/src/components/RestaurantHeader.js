import { Box, Typography } from "@mui/material";

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
            position: 'relative',
        }}>
            {/* Logo and restaurant name*/}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 0.7, sm: 2 }
            }}>
                {/* Logo container */}
                <Box sx={{
                    width: { xs: 62, sm: 90 },
                    height: { xs: 62, sm: 90 },
                    bgcolor: '#FFF8E1',
                    borderRadius: '50%',
                    overflow: 'hidden', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px 0 rgba(141,43,11,0.10)',
                    flexShrink: 0,
                    position: 'relative'
                }}>
                    <img
                        src="/assets/images/app_icon_1024.png"
                        alt="Casa Del Gusto"
                        style={{
                            position: 'absolute',
                            width: '105%',
                            height: '105%',
                            objectFit: 'contain',
                            padding: '8px'
                        }}
                    />
                </Box>
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant="h3" sx={{ fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: 2, mb: 0, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                        Casa Del Gusto
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Georgia, serif', opacity: 0.85, fontSize: { xs: '0.95rem', sm: '1.05rem' }, mt: 0 }}>
                        Fine Dining & Exquisite Taste
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default RestaurantHeader;
