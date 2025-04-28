import { useEffect,useState } from "react";
import { getUserIdFromToken } from "../utils/userId";

export const useCart = () =>{
    const [cartItems, setCartItems] = useState([]);
    const [isLoading ,setIsLoading] = useState(true);
    const userId =getUserIdFromToken();

    useEffect(() => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || {}
            if (userId && storedCart[userId]) {
                setCartItems(storedCart[userId]);
            }
            setIsLoading(false);
        }, [userId]);
    const clearCart = () =>{
        const storedCart =JSON.parse(localStorage.getItem('cart')) || {};
        if(userId){
            delete storedCart[userId];
            localStorage.setItem('cart', JSON.stringify(storedCart));
            setCartItems([]);
        }
    }
    return {cartItems , userId ,setCartItems , clearCart , isLoading};
};