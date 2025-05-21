import { useState, useEffect } from "react";
import { collection, doc, deleteDoc, updateDoc, addDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import cong from "../Firebase";
import restaurantTheme from "../theme/restaurantTheme";

const useMenuItems = () => {
    const [items, setItems] = useState([]);
    const [isItemsLoading, setIsItemsLoading] = useState(true);

    // Toast notifications
    const notifyAddItem = () => toast.success("Item added", {
        style: { "--toastify-icon-color-success": restaurantTheme.palette.primary.main }
    }); 
    const notifyAddItemFail = () => toast.error("Item not added");
    const notifyEditItemFail = () => toast.error("Item not edited");
    const notifyDeleteItemSuccess = () => toast.success("Item deleted", {
        style: { "--toastify-icon-color-success": restaurantTheme.palette.primary.main }
    })
    const notifyDeleteItemFail = () => toast.error("Item not deleted");

    // Set up real-time listener for Firestore items
    useEffect(() => {
        setIsItemsLoading(true);

        // Create a listener that updates whenever the database changes
        const unsubscribe = onSnapshot(
            collection(cong, "items"),
            (snapshot) => {
                const itemsArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setItems(itemsArray);
                setIsItemsLoading(false);
            },
            (error) => {
                console.error("Error fetching items : ", error);
                toast.error("Failed to load items");
                setIsItemsLoading(false);
            }
        );

        // Clean up the listener when component unmounts
        return () => unsubscribe();
    }, []);

    // Add a new item
    const addItem = async (newItemName, newItemPrice) => {
        const trimmedName = newItemName.trim();
        const price = Number(newItemPrice);

        try {
            // save the item - no need to update state manually, onSnapshot will handle it
            await addDoc(collection(cong, "items"), {
                itemName: trimmedName,
                itemPrice: price
            });

            notifyAddItem();
            return true;
        } catch (error) {
            console.error("Error adding item:", error);
            notifyAddItemFail();
            return false;
        }
    };

    // Update an existing item
    const updateItem = async (itemId, editItemName, editItemPrice) => {
        try {
            // Trim the name before saving
            const trimmedName = editItemName.trim();
            const price = Number(editItemPrice);

            const docRef = doc(cong, "items", itemId);
            await updateDoc(docRef, {
                itemName: trimmedName,
                itemPrice: price
            });

            // No need to manually update state, onSnapshot will handle it
            return true;
        } catch (error) {
            console.error("Error updating item : ", error);
            notifyEditItemFail();
            return false;
        }
    };

    // Delete an item
    const deleteItem = async (itemId) => {
        try {
            // onSnapshot automatically manage state
            await deleteDoc(doc(cong, "items", itemId));
            
            notifyDeleteItemSuccess();
            return true;
        } catch (error) {
            console.error("Item not deleted: ", error);
            notifyDeleteItemFail();
            return false;
        }
    };

    return {
        items,
        isItemsLoading,
        addItem,
        updateItem,
        deleteItem
    };
};

export default useMenuItems;
