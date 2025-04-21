import axios from "axios";

const API_URL = "https://67f4f17d913986b16fa27642.mockapi.io/Couturier/Review"

export const fetchReviews = async () =>{
    const {data} = await axios.get(API_URL);
    console.log(data.map(review => review.name));
    return data;
}