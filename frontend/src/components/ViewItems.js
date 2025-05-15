import {useEffect, useState} from "react";
import {collection, getDocs} from "firebase/firestore";
import cong from "../Firebase";

/**
 * TODO : 
 *  Beautify the page
 *  Add proper html ids and classnames and stuff
 *  Handle errors
 *  Do something about the loading time or display something till data loads or prevent data being fetched everytime
 *  What happens if alot of items are added? Handle this
 */

export default function ViewItems(){
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        // firestore database approach
        async function fetchData(){
            const querySnapshot = await getDocs(collection(cong, "items"));

            const itemsArray = querySnapshot.docs.map(doc => doc.data());
            setItems(itemsArray);
            console.log(itemsArray);
            console.log(items);
        }
        
        fetchData();
    }, []);

    return(
        <div>
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
                        </tr>
                    ))}
                </tbody>
            </table>

            <a href="/add-item"><button>Add new item</button></a>
        </div>
    );
}