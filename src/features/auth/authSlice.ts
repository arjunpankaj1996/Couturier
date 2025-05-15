import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import { User , AuthState } from "../../interface/loginInterface";
import { fetchThunk, loginThunk , registerThunk  } from "./authThunk";
import { decodeToken } from "../../utils/jwtService";
import { JwtPayload } from "jwt-decode";


const initialState : AuthState = {
    users:{
        id:null,
        name:'',
        email : '',
        password : '',
    },
    user:decodeToken(),
    token:null,
    loading:false,
    error:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchThunk.pending , (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchThunk.fulfilled , (state , action) =>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(fetchThunk.rejected , (state , action)=>{
            state.loading = false;
            state.error = action.error.message || 'Fetching failed';
        })
        .addCase(loginThunk.pending , (state)=>{
            state.loading =  true;
            state.error = null;
        })
        .addCase(loginThunk.fulfilled , (state ,action : PayloadAction<{user : User ; token : string}>)=>{
            state.loading = false;
            state.user = action.payload.user as JwtPayload;
            state.token = action.payload.token;
        })
        .addCase(loginThunk.rejected , (state , action) =>{
            state.loading = false;
            state.error = action.error.message || 'Login failed';
        })
        .addCase(registerThunk.pending , (state) =>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerThunk.fulfilled , (state ) =>{
            state.loading = false;
        })
        .addCase(registerThunk.rejected , (state , action) =>{
            state.loading = false;
            state.error = action.error.message || 'Registration failed'
        })
    }
})
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export default authSlice.reducer;