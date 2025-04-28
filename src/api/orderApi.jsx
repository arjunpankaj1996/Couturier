import axios from "axios"
import { getUserIdFromToken } from "../utils/userId"

const API_URL = "https://67f4f17d913986b16fa27642.mockapi.io/Couturier/orders"
export const fetchOrders = async () => {
    const userId = getUserIdFromToken();
    const {data} = await axios.get(API_URL);
    return data.filter(orders => orders.userid === userId)
}

