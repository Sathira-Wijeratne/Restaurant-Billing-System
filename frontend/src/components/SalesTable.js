import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const SalesTable = ({ sales, isSalesLoading, onViewClick }) => {
    if (isSalesLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress color="primary" />
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
                    mt: 3,                    backgroundColor: (theme) => theme.palette.background.default,
                    border: (theme) => `1px dashed ${theme.palette.border.dashed}`
                }}
            >                <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.message }}>
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
                border: (theme) => `1px solid ${theme.palette.border.light}`
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
                                    backgroundColor: (theme) => theme.palette.background.alternateRow,
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
