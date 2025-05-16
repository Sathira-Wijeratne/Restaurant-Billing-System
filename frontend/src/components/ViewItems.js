import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import cong from "../Firebase";
import { toast, ToastContainer } from "react-toastify";

/**
 * TODO :
 * Day 1
 *  Beautify the page
 *  Add proper html ids and classnames and stuff, and structure the code properly
 *  Handle errors
 *  Do something about the loading time or display something till data loads or prevent data being fetched everytime
 *  What happens if alot of items are added? Handle this
 * Day 2
 *  Can the edit modal be defined as a seperate file?
 *  Can the validation logic not be duplicated?
 *  Order of the items being displayed changes, last added is not at the bottom.
 *  Handle no items being there
 *  make sure add button position doesn't change based on the list length (use pagination or something within a small box)
 */

export default function ViewItems() {
    const [items, setItems] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editItemName, setEditItemName] = useState("");
    const [editItemPrice, setEditItemPrice] = useState("");
    const [blockingAction, setBlockingAction] = useState(false);

    const notifyEditItemFail = () => toast.error("Item not edited");
    const notifyDeleteItemFail = () => toast.error("Item not deleted");

    useEffect(() => {
        // firestore database approach
        async function fetchData() {
            const querySnapshot = await getDocs(collection(cong, "items"));

            const itemsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setItems(itemsArray);
            console.log(itemsArray);
            console.log(items);
        }

        fetchData();
    }, []);

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

    const handleDeleteClick = async (item) => {
        setBlockingAction(true);
        toast.info(
            <div>
                <p>Are you sure you want to delete "{item.itemName}"?</p>
                <div>
                    <button onClick={async () => {
                        toast.dismiss();
                        setBlockingAction(false);

                        // delete item
                        try {
                            await deleteDoc(doc(cong, "items", item.id));
                            setItems(items.filter(i => i.id !== item.id));
                        } catch (error) {
                            console.error("Item not deleted : ", error);
                            notifyDeleteItemFail();
                        }
                        toast.success('Item deleted');
                    }}>Confirm</button>
                    <button onClick={() => {
                        toast.dismiss();
                        setBlockingAction(false);
                    }}>Cancel</button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false
            }
        )
    }

    return (
        <>
            {blockingAction && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                </div>
            )}
            <div>
                <ToastContainer position="top-center" autoClose={1000} pauseOnHover={false} hideProgressBar={true} />
                <h1>Items : {items.length} </h1>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price (Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.itemName}</td>
                                <td>{item.itemPrice}</td>
                                <td><button onClick={() => handleEditClick(item)}>Edit</button></td>
                                <td><button onClick={() => handleDeleteClick(item)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <a href="/add-item"><button>Add new item</button></a>

                {/* Edit modal */}
                {showEditModal && (
                    <div>
                        <div>
                            <h2>Edit Item</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div>
                                    <label>Item Name</label>
                                    <input
                                        required
                                        type="string"
                                        value={editItemName}
                                        onChange={(e) => {
                                            // replace anything that is not an uppercase, lowercase or space with nothing
                                            let value = e.target.value.replace(/[^A-Za-z ]/g, '');
                                            // remove one or more white spaces with a single space
                                            value = value.replace(/\s+/g, ' ');
                                            setEditItemName(value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <label>Item Price(Rs.)</label>
                                    <input
                                        required
                                        type="number"
                                        value={editItemPrice}
                                        min={0}
                                        onChange={(e) => {
                                            setEditItemPrice(e.target.value);
                                        }}
                                    />
                                </div>
                                <div>
                                    <button onClick={() => setShowEditModal(false)}>Cancel</button>
                                    <button type="submit">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}