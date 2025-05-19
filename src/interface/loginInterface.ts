import { JwtPayload } from "jwt-decode";

export interface User{
  id :number | null;
  name:string;
  email:string;
  password?:string;
  token?: string;
}
export interface AuthState {
  users:User;
  user: JwtPayload | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
//------------------- authApi.ts ---------------------
export interface LoginParams {
  email: string;
  password: string;
}
export interface RegisterParams {
  id : number;
  name: string;
  email: string;
  password: string;
  terms: boolean;
}
//------------------- authApi.ts ---------------------

//------------------- LoginRight.ts ---------------------
export interface  LoginFormValues  {
    email : string;
    password : string;
  }
export interface RegisterFormValue  {
    name : string;
    email :string;
    password : string;
    terms : boolean;
  }
//------------------- LoginRight.ts ---------------------