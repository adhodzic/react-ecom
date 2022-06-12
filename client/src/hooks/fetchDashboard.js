import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/userApi";

export default function useDashboard(props) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dashboadData, setDashboardData] = useState(null);
    const navigate = useNavigate()
    const getDashboard = async () => {
        try{
            setIsLoading(true);
            const data = await apiService.getUserData();
            if(data.isError) throw new Error(data.error.response.status)
            setDashboardData(data)
            setIsLoading(false)
            console.log(data)
            return data;
        }
        catch(error){
            if(error.message == 401){
                localStorage.clear()
            }
            setIsError({error, isError: true});
        }   
    };

    const saveDashboard = async (userData) => {
            const data = await apiService.saveUserData(userData);
            if(data?.isError) return setIsError(data.error);
            setDashboardData(data)
            getDashboard()
            console.log(data)
            return data;
    }

    return {
        dashboadData,
        isError,
        isLoading,
        getDashboard,
        saveDashboard
    };
}
