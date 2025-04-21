import axios from "axios";

const API_URL = 'https://67e13f4158cc6bf78524f4d1.mockapi.io/api/couturier/Products' 

export const fetchProducts = async () => {
    const { data } = await axios.get(API_URL); 
    console.log(data.map(product => product.name));
    return data;
};