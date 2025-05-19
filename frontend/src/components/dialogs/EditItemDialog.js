import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { validateItemName, validateItemPrice } from "../../utils/ValidateItem";

const EditItemDialog = ({ open, onClose, onSubmit, editItemName, setEditItemName, editItemPrice, setEditItemPrice }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper:{sx: { borderRadius: 2 }}
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#F5EBD5', // Warm beige header
                color: '#5F4B32', // Warm brown text
                fontFamily: 'Georgia, serif' // Classic restaurant font
            }}>
                Edit Menu Item
            </DialogTitle>
            <form onSubmit={onSubmit}>
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
                        slotProps={{htmlInput:{min: 0, max: 50000, step : 0.01}}}
                        onChange={(e) => {
                            const value = e.target.value;
                            // allow up to 5 digits before the decimal and 2 after
                            if(value === "" || /^\d{0,5}(\.\d{0,2})?$/.test(value)){ 
                                setEditItemPrice(validateItemPrice(value));
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
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditItemDialog;
