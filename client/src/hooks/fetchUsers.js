import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/userApi";

export default function useUsers() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState(null);

    const getUsers = async () => {
        try{
            setIsLoading(true);
            const data = await apiService.getUsers();
            setUsers(data)
            setIsLoading(false)
            console.log(data)
            return data;
        }
        catch(error){
            console.log(error)
            setIsError(error);
        }   
    };

    const saveUsers = async (usersData) => {
            const data = await apiService.saveUsers(usersData);
            if(data?.isError) return setIsError(data.error);
            setUsers(data)
            getUsers()
            console.log(data)
            return data;
    }

    return {
        users,
        isError,
        isLoading,
        getUsers,
        saveUsers
    };
}
