import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const SalesTable = ({ sales, isSalesLoading, onViewClick }) => {
    if (isSalesLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress sx={{ color: 'primary' }} />
            </Box>
        );
    }

    if (sales.length === 0) {
        return (
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    mt: 3,
                    backgroundColor: '#F9F3E6',
                    border: '1px dashed #D2B48C'
                }}
            >
                <Typography variant="h6" color="#8D6E63">
                    No sales found
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer 
            component={Paper} 
            elevation={2}
            sx={{
                maxHeight: '62vh',
                overflow: 'auto',
                mt: 3,
                borderRadius: 2,
                border: '1px solid #E8E0D0'
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Sale ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Total (Rs.)</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sales.map((sale) => (
                        <TableRow 
                            key={sale.id} 
                            hover
                            sx={{
                                '&:nth-of-type(odd)': {
                                    backgroundColor: '#FAFAF7',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                                {sale.id}
                            </TableCell>
                            <TableCell>{sale.formattedDate}</TableCell>
                            <TableCell>{sale.totalCost ? sale.totalCost.toFixed(2) : "0.00"}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<Visibility />}
                                    onClick={() => onViewClick(sale)}
                                    sx={{ 
                                        borderRadius: 2,
                                        textTransform: 'none'
                                    }}
                                >
                                    Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SalesTable;
