import { Dialog, DialogTitle, DialogContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, DialogActions, Button, CircularProgress } from "@mui/material";

const SaleDetailsDialog = ({ open, onClose, sale, saleItems, isLoading }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {sx: { borderRadius: 2 }}
            }}
        >            <DialogTitle sx={{ 
                backgroundColor: (theme) => theme.components.MuiTableCell.styleOverrides.head.backgroundColor,
                color: (theme) => theme.components.MuiTableCell.styleOverrides.head.color,
                fontFamily: 'Georgia, serif',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 600 }}>
                        Sale Details
                    </Typography>
                </div>
                <div>
                    <Typography variant="body1" sx={{ opacity: 0.8, fontWeight: 'bold'}}>
                        {sale?.formattedDate}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent>
                <Box my={2}>
                    <Typography variant="subtitle1">
                        <strong>Sale ID:</strong> {sale?.id}
                    </Typography>
                </Box>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : saleItems && saleItems.length > 0 ? (
                    <TableContainer component={Paper} sx={{ maxHeight: '50vh', overflow: 'auto', mb: 2, borderRadius: 2 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Price (Rs.)</TableCell>
                                    <TableCell align="right">Subtotal (Rs.)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {saleItems.map((item) => {
                                    const subtotal = item.quantity * item.price;
                                    return (
                                        <TableRow 
                                            key={item.id}
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: (theme) => theme.palette.background.alternateRow,
                                                },
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 500 }}>{item.item}</TableCell>
                                            <TableCell align="center">{item.quantity}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">{subtotal.toFixed(2)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow sx={{ backgroundColor: (theme) => theme.components.MuiTableCell.styleOverrides.head.backgroundColor }}>
                                    <TableCell colSpan={2} />
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>Total:</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                                        {sale?.totalCost ? sale.totalCost.toFixed(2) : "0.00"}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Paper 
                        elevation={1} 
                        sx={{                            p: 3, 
                            textAlign: 'center', 
                            backgroundColor: (theme) => theme.palette.background.default,
                            border: (theme) => `1px dashed ${theme.palette.border.dashed}`
                        }}
                    >                        <Typography variant="body1" sx={{ color: (theme) => theme.palette.text.message }}>
                            No items found for this sale
                        </Typography>
                    </Paper>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: 2 }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaleDetailsDialog;
