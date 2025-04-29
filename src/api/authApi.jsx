import axios from "axios";
import { encodeToken , decodeToken , logoutUser } from "../utils/jwtService";

const API_URL = 'https://67e13f4158cc6bf78524f4d1.mockapi.io/api/couturier/Users'

export const fetchUsers =async ()=>{
    const user = decodeToken();
    if (!user) 
        throw new Error("Unauthorized access. Please log in.");
    const {data} =await axios.get(API_URL); 
    return data;    
}

export const loginUser = async({email ,password}) =>{
    const {data : users} = await axios.get(API_URL);
    const logUser = users.find((user) => user.email === email && user.password === password )
    if(!logUser)
        throw new Error("Invalid email or password");
    const token = encodeToken(logUser);
    localStorage.setItem("token" , token);
    localStorage.setItem("user" , JSON.stringify(logUser));
    return {...logUser , token};
}

export const registerUser =async (userData) =>{
    const {data : users} = await axios.get(API_URL);
    const existEmail = users.some((user) => user.email === userData.email );
    if(existEmail) {
        throw new Error('User already registered')
      }
    const {data : newUser} = await axios.post(API_URL , userData);
    return {...newUser};
}

export {logoutUser}