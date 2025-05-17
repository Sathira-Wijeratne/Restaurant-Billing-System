import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Add, MenuBook } from "@mui/icons-material";
import { Paper, Button, Typography, Box, Container, ThemeProvider, CircularProgress } from "@mui/material";
import restaurantTheme from "../theme/restaurantTheme";
import AddItemDialog from "./dialogs/AddItemDialog";
import EditItemDialog from "./dialogs/EditItemDialog";
import MenuItemsTable from "./MenuItemsTable";
import useMenuItems from "../hooks/useMenuItems";

/**
 * TODO :
 *  Day 1:
 *      What happens if alot of items are added? Handle this
 *  Day 3:
 *      Multiple deletes (via selection)
 */

export default function ViewAndManageItems() {
    // State variables
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editItemName, setEditItemName] = useState("");
    const [editItemPrice, setEditItemPrice] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemPrice, setNewItemPrice] = useState("");
    const [blockingAction, setBlockingAction] = useState(false);

    // custom hook for menu item operations
    const { items, isItemsLoading, addItem, updateItem, deleteItem } = useMenuItems();

    // Handle add button click
    const handleAddClick = () => {
        setNewItemName("");
        setNewItemPrice("");
        setShowAddModal(true);
    };

    // Handle form submission for adding a new item
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const success = await addItem(newItemName, newItemPrice);
        if (success) {
            setShowAddModal(false);
        }
    };

    // Handle form submission for editing an item
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const success = await updateItem(editItem.id, editItemName, editItemPrice);
        if (success) {
            setShowEditModal(false);
        }
    };

    // Handle edit button click
    const handleEditClick = (item) => {
        setEditItem(item);
        setEditItemName(item.itemName);
        setEditItemPrice(item.itemPrice);
        setShowEditModal(true);
    };

    // Handle delete button click
    const handleDeleteClick = (item) => {
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
                            await deleteItem(item.id);
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
                style: { width: 'auto' },
                position: "top-center"
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
                    position="bottom-center"
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
                        <MenuItemsTable
                            items={items}
                            isLoading={isItemsLoading}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                        />
                    </Paper>
                </Container>

                {/* Edit Item Dialog Component */}
                <EditItemDialog
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleEditSubmit}
                    editItemName={editItemName}
                    setEditItemName={setEditItemName}
                    editItemPrice={editItemPrice}
                    setEditItemPrice={setEditItemPrice}
                />

                {/* Add Item Dialog Component */}
                <AddItemDialog
                    open={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddSubmit}
                    newItemName={newItemName}
                    setNewItemName={setNewItemName}
                    newItemPrice={newItemPrice}
                    setNewItemPrice={setNewItemPrice}
                />
            </Box>
        </ThemeProvider>
    );
}