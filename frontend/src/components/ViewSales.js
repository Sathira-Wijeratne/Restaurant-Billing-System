import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { PointOfSale } from "@mui/icons-material";
import { Paper, Typography, Box, Container, ThemeProvider, Button } from "@mui/material";
import restaurantTheme from "../theme/restaurantTheme";
import SalesTable from "./SalesTable";
import SaleDetailsDialog from "./dialogs/SaleDetailsDialog";
import useSales from "../hooks/useSales";
import { useNavigate } from "react-router-dom";

export default function ViewSales() {
    // State variables
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [saleItems, setSaleItems] = useState([]);
    const [isItemsLoading, setIsItemsLoading] = useState(false);
    const [blockingAction, setBlockingAction] = useState(false);

    // Custom hook for sales operations
    const { sales, isSalesLoading, getSaleItems } = useSales();

    const navigate = useNavigate();

    // Handle view button click
    const handleViewClick = async (sale) => {
        setSelectedSale(sale);
        setIsItemsLoading(true);
        setShowDetailsModal(true);

        // Load sale items
        const items = await getSaleItems(sale.id);
        setSaleItems(items);
        setIsItemsLoading(false);
    };

    return (
        <ThemeProvider theme={restaurantTheme}>            <Box sx={{
                minHeight: '100vh',
                backgroundColor: (theme) => theme.palette.background.default,
                backgroundImage: (theme) => `linear-gradient(rgba(255, 248, 225, 0.8), rgba(255, 248, 225, 0.8)), url("https://www.transparenttextures.com/patterns/food.png")`,
                pt: 2
            }}>
                {/* Overlay for blocking action */}
                {blockingAction && (
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 9999,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    />
                )}

                {/* Toast notifications */}
                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    pauseOnHover={false}
                    hideProgressBar={true}
                    closeButton={false}
                    theme="light"
                    style={{ width: 'auto' }}
                />

                {/* Main content */}
                <Container maxWidth="md">                    <Paper elevation={3} sx={{
                        p: 3,
                        mb: 4,
                        borderTop: (theme) => `6px solid ${theme.palette.primary.main}`,
                        backgroundColor: (theme) => theme.palette.background.paper
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',                                    color: (theme) => theme.palette.text.accent,
                                    fontFamily: 'Georgia, serif'
                                }}
                            >
                                <PointOfSale sx={{ mr: 1, fontSize: 'inherit', color: 'primary.main' }} />
                                Total Sales: {sales.length}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/')}
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    boxShadow: (theme) => `0 4px 8px ${theme.palette.primary.main}33` // Subtle shadow
                                }}
                            >
                                Back to home
                            </Button>
                        </Box>
                        <SalesTable
                            sales={sales}
                            isSalesLoading={isSalesLoading}
                            onViewClick={handleViewClick}
                        />
                    </Paper>
                </Container>

                {/* Sale Details Dialog */}
                <SaleDetailsDialog
                    open={showDetailsModal}
                    onClose={() => setShowDetailsModal(false)}
                    sale={selectedSale}
                    saleItems={saleItems}
                    isLoading={isItemsLoading}
                />
            </Box>
        </ThemeProvider>
    );
}