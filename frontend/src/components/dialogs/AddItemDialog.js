import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { validateItemName, validateItemPrice } from "../../utils/ValidateItem";

const AddItemDialog = ({ open, onClose, onSubmit, newItemName, setNewItemName, newItemPrice, setNewItemPrice }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {sx: { borderRadius: 2 }}
            }}
        >            <DialogTitle sx={{ 
                backgroundColor: (theme) => theme.components.MuiTableCell.styleOverrides.head.backgroundColor,
                color: (theme) => theme.components.MuiTableCell.styleOverrides.head.color,
                fontFamily: 'Georgia, serif' // Classic restaurant font
            }}>
                Add New Menu Item
            </DialogTitle>
            <form onSubmit={onSubmit}>
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
                        slotProps={{htmlInput:{min: 0, max: 50000, step : 0.01}}}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(value === "" || /^\d{0,5}(\.\d{0,2})?$/.test(value)){
                                setNewItemPrice(validateItemPrice(value));
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={onClose}
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
    );
};

export default AddItemDialog;
