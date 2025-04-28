import { fetchOrders } from "../api/orderApi";
import { useQuery } from "@tanstack/react-query";
import { getUserIdFromToken } from "../utils/userId";

export const useOrders = () =>{
    const userId = getUserIdFromToken();
    const { data:orders = [], isLoading ,isError } = useQuery({
        queryKey : ['orders' , userId],
        queryFn : ()=> fetchOrders(userId),
        enabled: !!userId,
    });
    return {orders , isLoading , isError}
}