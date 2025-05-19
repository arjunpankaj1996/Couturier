import { encodeToken , decodeToken  } from "../utils/jwtService";
import { User , LoginParams , RegisterParams } from "../interface/loginInterface";
import { getRequest1 , postRequest1 } from "./apiRequest";

const URL_ENDPIONT = '/Users'

export const fetchUsers = async ():Promise<User[]>=>{
    const user = decodeToken();
    if (!user) 
        throw new Error("Unauthorized access. Please log in.");
    return await getRequest1<User[]>(URL_ENDPIONT);
}

export const loginUser = async({email ,password}:LoginParams):Promise<User> =>{
    const users = await getRequest1<User[]>(URL_ENDPIONT);
    const logUser = users.find((user) => user.email === email && user.password === password )
    if(!logUser)
        throw new Error("Invalid email or password");
    const token = encodeToken(logUser);
    localStorage.setItem("token" , token);
    localStorage.setItem("user" , JSON.stringify(logUser));
    
    return {...logUser , token};
}

export const registerUser = async (userData:RegisterParams):Promise<User> =>{
    const users = await getRequest1<User[]>(URL_ENDPIONT);
    const existEmail = users.some((user) => user.email === userData.email );
    if(existEmail) {
        throw new Error('User already registered')
      }
    const  newUser = await postRequest1<User>(URL_ENDPIONT , userData);
    return newUser;
}
