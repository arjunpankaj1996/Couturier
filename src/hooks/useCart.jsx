import { useEffect,useState } from "react";
import { getUserIdFromToken } from "../utils/userId";

export const useCart = () =>{
    const [cartItems, setCartItems] = useState([]);
    const userId =getUserIdFromToken();

    useEffect(() => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || {}
            if (userId && storedCart[userId]) {
                setCartItems(storedCart[userId]);
            }
        }, [userId]);
    return {cartItems , userId ,setCartItems};
};