import { useEffect } from "react";
import { useAppDispatch ,useAppSelector } from "../store/hooks";
import { fetchAllProducts } from "../features/product/productSlice";

export const useProducts =()=>{
    const dispatch = useAppDispatch();
    const {item ,loading ,error} = useAppSelector((state) => state.products);

    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch]);
    return {item , loading , error}
}