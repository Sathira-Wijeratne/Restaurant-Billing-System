import React, {useEffect, useState} from "react";
import cong from "../Firebase";
import {collection, addDoc} from "firebase/firestore";

/**
 * TODO :
 *  Beautify page
 *  Add proper html ids and classnames and stuff
 *  Validate form (frontend)
 *  Notify user that item has been successfully addded or if something goes wrong
 *  Clear form
 */

export default function AddItem(){
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState();

    async function saveItem(){
        // validate fields

        // save the item
        try {
            const docRef = await addDoc(collection(cong, "items"),{
                itemName : itemName,
                itemPrice : itemPrice
            });
            console.log("Document written with ID : ", docRef.id);
        } catch (e) {
            console.error("Error adding item : ", e);
        }
    }

    function clearFields(){
        setItemName("");
        setItemPrice("");
    }

    return(
        <div>
            <h1>Add item form</h1>
            <div>
                <form>
                    <div>
                        <label>Item Name</label>
                        <input type="text" value={itemName} onChange={(e) => {
                            setItemName(e.target.value);
                        }}/>
                    </div>
                    <div>
                        <label>Item Price</label>
                        <input type="number" value={itemPrice} onChange={(e) => {
                            setItemPrice(e.target.value);
                        }}/>
                    </div>
                </form>
            </div>
            <div>
                <button onClick={() => {
                saveItem();
                clearFields();
            }}>Add item</button>
            <a href="/"><button>Home</button></a>
            </div>
        </div>
    );
}