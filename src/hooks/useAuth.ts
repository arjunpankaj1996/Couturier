import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { loginThunk , registerThunk  } from '../features/auth/authThunk';


type loginType = (email:string , password : string) => void;
type registerType = (email : string , name : string , password : string , terms : boolean , id? : number) => void

export const useAuth = () =>{
     const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector(selectAuth);

    const login:loginType = (email , password) =>{
        dispatch(loginThunk({email , password}))
    }
    const register:registerType =(name,email,password,terms)=>{
        dispatch(registerThunk({name,email,password,terms,id : 0}))
    }
    
    return { login ,register ,user , loading ,error};
};
