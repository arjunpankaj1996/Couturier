import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser , registerUser , fetchUsers } from "../../api/authApi";
import { LoginParams , RegisterParams } from "../../interface/loginInterface";
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';



export const fetchThunk = createAsyncThunk(
    'auth/fetchUsers' , async( _ , {rejectWithValue}) =>{
        try{
            const users = await fetchUsers();
            return users;
        } catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const loginThunk = createAsyncThunk(
    'auth/login' , async({email , password}:LoginParams,{rejectWithValue})=>{
        try{
            const user = await loginUser({email , password});
            notifications.show({
                title:'Login successfull',
                message:`Welcome ${user.name}`,
                color:'teal',
                position: 'top-right',
                icon :<IconCheck />,
                autoClose:2000,
            })
            return {user , token : user.token!};
        }catch(error){
            notifications.show({
                title:'Login failed',
                message:error.message,
                color:'red',
                position:'top-right',
                icon : <IconX/>,
                autoClose:2000,
            })
            return rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register' , async(userData : RegisterParams , {rejectWithValue}) =>{
        try{
            const user = await registerUser(userData);
            notifications.show({
                title:'Registration successfull',
                message:`${user.name} crearted account`,
                color:'teal',
                position:'top-right',
                icon:<IconCheck/>,
                autoClose:2000,
            })
            return user;
        }catch(error){
            notifications.show({
                title:'Registration',
                message:error.message,
                color:'red',
                position:'top-right',
                icon:<IconX />,
                autoClose:2000,
            })
            return rejectWithValue(error.message);
        }
    }
);