import axios, { AxiosResponse } from "axios";
import { encodeToken , decodeToken  } from "../utils/jwtService";
import { User , LoginParams , RegisterParams } from "../interface/loginInterface";


const API_URL = 'https://67e13f4158cc6bf78524f4d1.mockapi.io/api/couturier/Users'

export const fetchUsers = async ():Promise<User>=>{
    const user = decodeToken();
    if (!user) 
        throw new Error("Unauthorized access. Please log in.");
    try{
    const response:AxiosResponse = await axios.get<User[]>(API_URL); 
    return response.data;   
    }catch{
        throw new Error("Failed to fetch details..")
    } 
}

export const loginUser = async({email ,password}:LoginParams):Promise<User> =>{
    const {data : users} = await axios.get<User[]>(API_URL);
    const logUser = users.find((user) => user.email === email && user.password === password )
    if(!logUser)
        throw new Error("Invalid email or password");
    const token = encodeToken(logUser);
    localStorage.setItem("token" , token);
    localStorage.setItem("user" , JSON.stringify(logUser));
    
    return {...logUser , token};
}

export const registerUser = async (userData:RegisterParams):Promise<User> =>{
    const {data : users} = await axios.get<User[]>(API_URL);
    const existEmail = users.some((user) => user.email === userData.email );
    if(existEmail) {
        throw new Error('User already registered')
      }
    const {data : newUser} = await axios.post<User>(API_URL , userData);
    return newUser;
}
