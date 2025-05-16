import React, {useEffect, useState} from "react";
import cong from "../Firebase";
import {collection, addDoc} from "firebase/firestore";
import {ToastContainer, toast} from "react-toastify"

/**
 * TODO :
 *  Beautify page
 *  Add proper html ids and classnames and stuff, and structure the code properly
 *  handle same item being added more than once
 */

export default function AddItem(){
    // variables
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    // toasts
    const notifyAddItem = () => toast.success("Item added");
    const notifyAddItemFail = () => toast.error("Item not added")

    // functions
    async function saveItem(){
        // validate fields

        // save the item
        try {
            const docRef = await addDoc(collection(cong, "items"),{
                itemName : itemName,
                itemPrice : itemPrice
            });
            console.log("Document written with ID : ", docRef.id);
            notifyAddItem();
        } catch (e) {
            console.error("Error adding item : ", e);
            notifyAddItemFail();
        }
    }

    function clearFields(){
        setItemName("");
        setItemPrice("");
    }

    return(
        <div>
            <ToastContainer position = "top-center" autoClose = {1000} pauseOnHover = {false} hideProgressBar = {true}/>
            <h1>Add item form</h1>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    saveItem();
                    clearFields();
                }}>
                    <div>
                        <label>Item Name</label>
                        <input required type="text" value={itemName} placeholder="Enter name" pattern="[A-Za-z ]+" onChange={(e) => {
                            // replace anything that is not an uppercase, lowercase or space with nothing
                            let value = e.target.value.replace(/[^A-Za-z ]/g, '');
                            // replace one or more white spaces with single space
                            value = value.replace(/\s+/g, ' ');
                            // remove leading space if at beginning
                            if (value.startsWith(' ')) {
                                value = value.substring(1);
                            }
                            setItemName(value);
                        }}/>
                    </div>
                    <div>
                        <label>Item Price</label>
                        <input required type="number" value={itemPrice} min={0} placeholder="Enter Price " onChange={(e) => {
                            setItemPrice(e.target.value);
                        }}/>
                    </div>
                    <button type="submit">Add item</button>
                </form>
            </div>
            <a href="/"><button>Home</button></a>
            <div>
            </div>
        </div>
    );
}