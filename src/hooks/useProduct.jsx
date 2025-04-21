import { fetchProducts } from "../api/productApi"
import { useQuery } from "@tanstack/react-query"

export const useProduct = (productId) => {
  return  useQuery({
    queryKey : ['product' , productId],
    queryFn : async () => {
        const products = await fetchProducts();
            return products.find((product) => product.id === productId);       
    },
    enabled : !!productId,
  });
};

