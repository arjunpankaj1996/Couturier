import axios from "axios";
import { product } from "../interface/productlistinterface";

const API_URL =
  "https://67e13f4158cc6bf78524f4d1.mockapi.io/api/couturier/Products";

export const fetchProducts = async (): Promise<product[]> => {
  try {
    const { data } = await axios.get<product[]>(API_URL);
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch products..");
  }
};
