import { useState } from "react";
import cong from "../Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { validateItemName, validateItemPrice } from "../utils/ValidateItem";
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Paper,
    Grid
} from "@mui/material";

/**
 * TODO :
 *  Beautify page
 *  Add proper html ids and classnames and stuff, and structure the code properly
 *  handle same item being added more than once
 */

export default function AddItem() {
    // variables
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    // toasts
    const notifyAddItem = () => toast.success("Item added");
    const notifyAddItemFail = () => toast.error("Item not added")

    // functions
    async function saveItem() {
        // validate fields

        // save the item
        try {
            const docRef = await addDoc(collection(cong, "items"), {
                itemName: itemName,
                itemPrice: itemPrice
            });
            console.log("Document written with ID : ", docRef.id);
            notifyAddItem();
        } catch (e) {
            console.error("Error adding item : ", e);
            notifyAddItemFail();
        }
    }

    function clearFields() {
        setItemName("");
        setItemPrice("");
    }

    return (
        <Container maxWidth="md">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                pauseOnHover={false}
                hideProgressBar={true}
                closeButton={false}
                theme="light"
            />
            <Paper elevation={3} sx={{ p: 0, mt: 4 }}>
    <Typography variant="h5" sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        Add New Item
    </Typography>
    
    <form onSubmit={(e) => {
        e.preventDefault();
        saveItem();
        clearFields();
    }}>
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
            <TextField
                label="Item Name"
                fullWidth
                required
                value={itemName}
                margin="normal"
                placeholder="Enter name"
                onChange={(e) => {
                    setItemName(validateItemName(e.target.value));
                }}
            />
            <TextField
                label="Item Price (Rs.)"
                type="number"
                fullWidth
                required
                value={itemPrice}
                placeholder="Enter price"
                margin="normal"
                slot={{ min: 0, max: 50000 }}
                onChange={(e) => {
                    setItemPrice(validateItemPrice(e.target.value));
                }}
            />
        </Box>
        
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            px: 3, 
            pb: 2,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            pt: 2
        }}>
            <Button
                variant="outlined"
                color="inherit"
                component="a"
                href="/"
                sx={{ mr: 1 }}
            >
                Back to Home
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Add Item
            </Button>
        </Box>
    </form>
</Paper>
        </Container>
    );
}