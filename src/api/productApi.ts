import { product } from "../interface/productlistinterface";
import { getRequest1 } from "./apiRequest";

const PRODUCT_ENDPIONT = '/Products'

export const fetchProducts = async (): Promise<product[]> => {
  return await getRequest1<product[]>(PRODUCT_ENDPIONT);
};
