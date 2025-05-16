import {useEffect, useState} from "react";
import {collection, getDocs, doc, updateDoc} from "firebase/firestore";
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
 *  can the validation logic not be duplicated?
 *  order of the items being displayed changes, last added is not at the bottom
 */

export default function ViewItems(){
    const [items, setItems] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editItemName, setEditItemName] = useState("");
    const [editItemPrice, setEditItemPrice] = useState("");

    const notifyEditItemFail = () => toast.error("Item not edited");
    
    useEffect(() => {
        // firestore database approach
        async function fetchData(){
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
                itemName : trimmedName,
                itemPrice : editItemPrice
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

    return(
        <div>
            <ToastContainer position = "top-center" autoClose = {1000} pauseOnHover = {false} hideProgressBar = {true}/>
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
                            <td><button>Delete</button></td>
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
    );
}