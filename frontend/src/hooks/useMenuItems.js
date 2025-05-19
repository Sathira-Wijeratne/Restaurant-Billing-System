import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import cong from "../Firebase";

const useMenuItems = () => {
    const [items, setItems] = useState([]);
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

    // Add a new item
    const addItem = async (newItemName, newItemPrice) => {
        const trimmedName = newItemName.trim();
        const price = Number(newItemPrice);

        try {
            // save the item
            const docRef = await addDoc(collection(cong, "items"), {
                itemName: trimmedName,
                itemPrice: price
            });

            // Create new item object
            const newItem = {
                id: docRef.id,
                itemName: trimmedName,
                itemPrice: price
            };

            // Add the new item to the top of the list
            setItems([newItem, ...items]);
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

            // Update the local state to reflect changes
            const updatedItems = items.map(item =>
                item.id === itemId
                    ? { ...item, itemName: trimmedName, itemPrice: price}
                    : item
            );
            setItems(updatedItems);
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
            await deleteDoc(doc(cong, "items", itemId));
            setItems(items.filter(i => i.id !== itemId));
            toast.success('Item deleted');
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
