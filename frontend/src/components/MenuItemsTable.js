import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const MenuItemsTable = ({ items, isLoading, onEditClick, onDeleteClick }) => {
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress sx={{ color: 'primary' }} />
            </Box>
        );
    }

    if (items.length === 0) {
        return (
            <Paper 
                elevation={1} 
                sx={{ 
                    p: 3, 
                    textAlign: 'center', 
                    mt: 3,
                    backgroundColor: '#F9F3E6', // Warm cream background
                    border: '1px dashed #D2B48C' // Tan dashed border
                }}
            >
                <Typography variant="h6" color="#8D6E63"> {/* Warm brown text */}
                    No menu items found
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
                border: '1px solid #E8E0D0' // Subtle border
            }}
        >
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Price (Rs.)</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow 
                            key={item.id} 
                            hover
                            sx={{
                                '&:nth-of-type(odd)': {
                                    backgroundColor: '#FAFAF7', // Subtle alternating row color
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 500 }}>{item.itemName}</TableCell>
                            <TableCell>{item.itemPrice}</TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="default"
                                    onClick={() => onEditClick(item)}
                                    size="small"
                                    sx={{ mr: 0.5 }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="primary"
                                    onClick={() => onDeleteClick(item)}
                                    size="small"
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MenuItemsTable;
