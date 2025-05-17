import cong from "../Firebase";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Delete, Edit, Add, RestaurantMenu, MenuBook } from "@mui/icons-material";
import { validateItemName, validateItemPrice } from "../utils/ValidateItem";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogTitle, TextField, Typography, Box, Container, IconButton, CircularProgress, DialogContent, createTheme, ThemeProvider } from "@mui/material";

/**
 * TODO :
 *  Day 1:
 *      What happens if alot of items are added? Handle this
 *  Day 2:
 *      Can the edit modal be defined as a seperate file?
 *      Make sure most recent item is added to the top
 *      Make sure add button position doesn't change based on the list length (use pagination or something within a small box)
 *  Day 3:
 *      Multiple deletes (via selection)
 */

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

export default function ViewAndManageItems() {
    // State variables
    const [items, setItems] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editItemName, setEditItemName] = useState("");
    const [editItemPrice, setEditItemPrice] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [blockingAction, setBlockingAction] = useState(false);
    const [isItemsLoading, setIsItemsLoading] = useState(true);

    // Toast notifications
    const notifyAddItem = () => toast.success("Item added");
    const notifyAddItemFail = () => toast.error("Item not added");
    const notifyEditItemFail = () => toast.error("Item not edited");
    const notifyDeleteItemFail = () => toast.error("Item not deleted");

    // Fetch items from Firestore on component mount
    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(collection(cong, "items"));

                const itemsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setItems(itemsArray);
            } catch (error) {
                console.error("Error fetching items : ", error);
                toast.error("Failed to load items");
            } finally {
                setIsItemsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Handle add button click
    const handleAddClick = () => {
        setNewItemName("");
        setNewItemPrice("");
        setShowAddModal(true);
    };

    // Handle form submission for adding a new item
    const handleAddSubmit = async (e) => {
        e.preventDefault();

        // validate fields
        const trimmedName = newItemName.trim();

        try {
            // save the item
            const docRef = await addDoc(collection(cong, "items"), {
                itemName: trimmedName,
                itemPrice: newItemPrice
            });

            // Update local state to show the new item
            const newItem = {
                id: docRef.id,
                itemName: trimmedName,
                itemPrice: newItemPrice
            };

            // Add the new item to the top of the list
            setItems([newItem, ...items]);

            // Close modal and show success message
            setShowAddModal(false);
            notifyAddItem();
        } catch (e) {
            console.error("Error adding item:", e);
            notifyAddItemFail();
        }
    };

    // Handle form submission for editing an item
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            // Trim the name before saving
            const trimmedName = editItemName.trim();

            const docRef = doc(cong, "items", editItem.id);
            await updateDoc(docRef, {
                itemName: trimmedName,
                itemPrice: editItemPrice
            });

            // Update the local state to reflect changes
            const updatedItems = items.map(item =>
                item.id === editItem.id
                    ? { ...item, itemName: trimmedName, itemPrice: editItemPrice }
                    : item
            );
            setItems(updatedItems);
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating item : ", error);
            notifyEditItemFail();
        }
    }

    const handleEditClick = (item) => {
        setEditItem(item);
        setEditItemName(item.itemName);
        setEditItemPrice(item.itemPrice);
        setShowEditModal(true);
        console.log("edit model set to true");
    }

    // Handle delete button click
    const handleDeleteClick = async (item) => {
        setBlockingAction(true);
        toast.info(
            <Box sx={{ p: 1 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Are you sure you want to delete "{item.itemName}"?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={async () => {
                            toast.dismiss();
                            setBlockingAction(false);

                            // delete item
                            try {
                                await deleteDoc(doc(cong, "items", item.id));
                                setItems(items.filter(i => i.id !== item.id));
                                toast.success('Item deleted');
                            } catch (error) {
                                console.error("Item not deleted: ", error);
                                notifyDeleteItemFail();
                            }
                        }}
                    >
                        Confirm
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            toast.dismiss();
                            setBlockingAction(false);
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                icon: false,
                style: { width: 'auto' }
            }
        );
    };

    return (
        <ThemeProvider theme={restaurantTheme}>
            <Box sx={{ 
                minHeight: '100vh',
                backgroundColor: '#FFF8E1', // Warm cream background
                backgroundImage: 'linear-gradient(rgba(255, 248, 225, 0.8), rgba(255, 248, 225, 0.8)), url("https://www.transparenttextures.com/patterns/food.png")',
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
                    position="top-center"
                    autoClose={1000}
                    pauseOnHover={false}
                    hideProgressBar={true}
                    closeButton={false}
                    theme="light"
                    style={{ width: 'auto' }}
                />
                
                {/* Main content */}
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ 
                        p: 3, 
                        mb: 4, 
                        borderTop: '6px solid #8D2B0B', // Warm brick red accent line
                        backgroundColor: 'white'
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
                                    alignItems: 'center',
                                    color: '#5F4B32', // Warm brown text
                                    fontFamily: 'Georgia, serif' // Classic restaurant font
                                }}
                            >
                                <MenuBook sx={{ mr: 1, fontSize: 'inherit', color: 'primary.main' }} />
                                Menu Items: {items.length}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddClick}
                                startIcon={<Add />}
                                sx={{ 
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    boxShadow: '0 4px 8px rgba(141, 43, 11, 0.2)' // Subtle shadow
                                }}
                            >
                                Add New Item
                            </Button>
                        </Box>
                        
                        {/* Loading state */}
                        {isItemsLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                                <CircularProgress sx={{ color: 'primary' }} /> {/* Match primary color */}
                            </Box>
                        ) : items.length === 0 ? (
                            // No items state
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
                        ) : (
                            // Items table
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
                                                        onClick={() => handleEditClick(item)}
                                                        size="small"
                                                        sx={{ mr: 0.5 }}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleDeleteClick(item)}
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
                        )}
                    </Paper>
                </Container>

                {/* Edit modal */}
                <Dialog
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: { borderRadius: 2 }
                    }}
                >
                    <DialogTitle sx={{ 
                        backgroundColor: '#F5EBD5', // Warm beige header
                        color: '#5F4B32', // Warm brown text
                        fontFamily: 'Georgia, serif' // Classic restaurant font
                    }}>
                        Edit Menu Item
                    </DialogTitle>
                    <form onSubmit={handleEditSubmit}>
                        <DialogContent>
                            <TextField
                                label="Item Name"
                                fullWidth
                                required
                                value={editItemName}
                                margin="normal"
                                onChange={(e) => {
                                    setEditItemName(validateItemName(e.target.value));
                                }}
                            />
                            <TextField
                                label="Item Price (Rs.)"
                                type="number"
                                fullWidth
                                required
                                value={editItemPrice}
                                margin="normal"
                                slot={{ min: 0, max: 50000 }}
                                onChange={(e) => {
                                    setEditItemPrice(validateItemPrice(e.target.value));
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button
                                onClick={() => setShowEditModal(false)}
                                color="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Save Changes
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                {/* Add modal */}
                <Dialog
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    maxWidth="sm"
                    fullWidth
                    slotProps={{
                        paper: {sx: { borderRadius: 2 }}
                    }}
                >
                    <DialogTitle sx={{ 
                        backgroundColor: '#F5EBD5', // Warm beige header
                        color: '#5F4B32', // Warm brown text
                        fontFamily: 'Georgia, serif' // Classic restaurant font
                    }}>
                        Add New Menu Item
                    </DialogTitle>
                    <form onSubmit={handleAddSubmit}>
                        <DialogContent>
                            <TextField
                                label="Item Name"
                                fullWidth
                                required
                                value={newItemName}
                                margin="normal"
                                onChange={(e) => {
                                    setNewItemName(validateItemName(e.target.value));
                                }}
                            />
                            <TextField
                                label="Item Price (Rs.)"
                                type="number"
                                fullWidth
                                required
                                value={newItemPrice}
                                margin="normal"
                                slot={{ min: 0, max: 50000 }}
                                onChange={(e) => {
                                    setNewItemPrice(validateItemPrice(e.target.value));
                                }}
                            />
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button
                                onClick={() => setShowAddModal(false)}
                                color="inherit"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add Item
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}