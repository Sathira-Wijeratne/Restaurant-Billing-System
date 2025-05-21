import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import cong from "../Firebase";

const useSales = () => {
    const [sales, setSales] = useState([]);
    const [isSalesLoading, setIsSalesLoading] = useState(true);

    // Fetch sales from Firestore on component mount
    useEffect(() => {
        // realtime listener
        setIsSalesLoading(true);

        // Create a query that orders by timestamp in descending order
        const salesQuery = query(
            collection(cong, "sales"),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(
            salesQuery,
            (snapshot) => {
                const salesArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Convert Firestore timestamp to Date object if it exists
                    formattedDate: doc.data().timestamp ?
                        new Date(doc.data().timestamp.seconds * 1000).toLocaleDateString(
                            'en-GB',
                        ) :
                        "Unknown date"
                }));

                setSales(salesArray);
                setIsSalesLoading(false);
            },
            (error) => {
                console.error("Error fetching sales: ", error);
                toast.error("Failed to load sales");
                setIsSalesLoading(false);
            }
        );

        // clean up listener
        return () => unsubscribe();
    }, []);

    // get sale items for a specific sale
    const getSaleItems = async (saleId) => {
        try {
            // get items per saleId
            const saleItemsQuery = query(
                collection(cong, "saleitems"),
                where("saleId", "==", saleId)
            );

            const querySnapshot = await getDocs(saleItemsQuery);

            // Map the documents to an array of sale items
            const saleItems = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return saleItems;
        } catch (error) {
            console.error("Error fetching sale items: ", error);
            toast.error("Failed to load sale details");
            return [];
        }
    };

    return {
        sales,
        isSalesLoading,
        getSaleItems
    };
};

export default useSales;
