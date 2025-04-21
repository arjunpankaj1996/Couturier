import { useQuery, useMutation ,useQueryClient } from "@tanstack/react-query";
import { fetchUsers, loginUser, registerUser ,logoutUser } from "../api/authApi";
import { decodeToken } from "../utils/jwtService";
import { notifications } from "@mantine/notifications";
import { IconX ,IconCheck } from "@tabler/icons-react";

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,    
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            notifications.show({
                title: 'Success',
                message: `Welcome ,${user.name}`,
                color: 'teal',
                position: 'top-right',
                icon: <IconCheck />,
                autoClose: 2000,
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Login Failed',
                message: error?.message,
                color: 'red',
                position: 'top-right',
                icon: <IconX />,
                autoClose: 2000
            })
        }
    })
};

export const useRegister = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (user) => {
            queryClient.invalidateQueries(["users"]);
            notifications.show({
                title: 'Success',
                message: `${user.name} created account`,
                color: 'teal',
                position: 'top-right',
                icon: <IconCheck />,
                autoClose: 2000,
            });
        },
        onError: (error) => {
            notifications.show({
                title: 'Registration Failed Failed',
                message: error?.message,
                color: 'red',
                position: 'top-right',
                icon: <IconX />,
                autoClose: 2000,
            })
        }
    });
};
export const useLogout =() =>{
    return () =>{
        logoutUser();
        
    }
}

export const useAuth =()=>{
    return decodeToken();
}