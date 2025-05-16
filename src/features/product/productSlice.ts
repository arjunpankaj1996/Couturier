import { createSlice , createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "../../api/productApi";
import { product ,ProductState } from "../../interface/productlistinterface";

const initialState : ProductState={
    item:[],
    loading:false,
    error:null,
}
export const fetchAllProducts = createAsyncThunk<product[], void , {rejectValue : string}>('products/fetchAll',async( _ , {rejectWithValue}) =>{
        try{
            const response = await fetchProducts();
            return response;
        } catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name :'products',
    initialState,
    reducers :{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllProducts.pending ,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled , (state , action : PayloadAction <product[]>)=>{
                state.item = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllProducts.rejected , (state ,action )=>{
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})
export default productSlice.reducer;