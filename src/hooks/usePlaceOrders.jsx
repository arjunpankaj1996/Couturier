import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePlaceOrders =(onSuccess)=>{
    return useMutation({
        mutationFn: (data) => axios.post('https://67f4f17d913986b16fa27642.mockapi.io/Couturier/orders', data),
        onSuccess,
        onError: (error) => {
            console.error('Error submitting order :', error)
        },
    })
}