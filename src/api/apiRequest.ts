import axios, { AxiosResponse } from "axios";

const baseUrl1 = import.meta.env.VITE_API_BASE_URL_1
const baseUrl2 = import.meta.env.VITE_API_BASE_URL_2

const axiosInstance1 = axios.create({
    baseURL : baseUrl1,
    headers : {
        "Content-Type" : "application/json"
    }
});
const axiosInstance2 = axios.create({
    baseURL : baseUrl2,
    headers : {
        "Content-Type" : "application/json"
    }
});
const handleResponse = async (response :AxiosResponse) =>{
    if(response.status === 200 || response.status === 201 || response.status === 204){
        return response.data;
    }
    return Promise.reject(response.data);
}

export const getRequest1 = async<T> (endpoint : string) :Promise<T> =>{
    try{
        const response:AxiosResponse<T> = await axiosInstance1.get(endpoint)
        return await handleResponse(response);
    }catch(error: any){
        return await handleResponse(error.response);
    }
}

export const getRequest2 = async<T> (endpoint : string): Promise<T> =>{
    try{
        const response:AxiosResponse<T> = await axiosInstance2.get(endpoint)
        return await handleResponse(response);
    }catch(error: any){
        return await handleResponse(error.response);
    }
}

export const postRequest1 = async<T> (endpoint : string , data : T) =>{
    try{
        const response:AxiosResponse = await axiosInstance1.post(endpoint , data);
            return await handleResponse(response)
    }catch(error : any){
        return await handleResponse(error.response)
    }
}

export const postRequest2 = async<T> (endpoint : string , data : T) =>{
    try{
        const response:AxiosResponse = await axiosInstance2.post(endpoint ,data);
            return await handleResponse(response)
    }catch(error : any){
        return await handleResponse(error.response)
    }
}