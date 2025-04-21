import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "../api/reviewApi";

export const useReviewsQuery = () =>{
    return useQuery({
        queryKey : ["reviews"],
        queryFn : fetchReviews,
    });
};