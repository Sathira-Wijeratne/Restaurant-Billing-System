import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const MenuItemsTable = ({ items, isLoading, onEditClick, onDeleteClick }) => {
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress color="primary" />
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
                    mt: 3,                    backgroundColor: (theme) => theme.palette.background.default,
                    border: (theme) => `1px dashed ${theme.palette.border.dashed}`
                }}
            >                <Typography variant="h6" sx={{ color: (theme) => theme.palette.text.message }}>
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
                border: (theme) => `1px solid ${theme.palette.border.light}`
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
                                    backgroundColor: (theme) => theme.palette.background.alternateRow,
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
