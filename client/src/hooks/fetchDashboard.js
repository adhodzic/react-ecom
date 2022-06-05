import { useState } from "react";
import apiService from "../services/userApi";

export default function useDashboard() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dashboadData, setDashboardData] = useState(null);

    const getDashboard = async () => {
        try{
            setIsLoading(true);
            const data = await apiService.getUserData();
            setDashboardData(data)
            setIsLoading(false)
            console.log(data)
            return data;
        }
        catch(error){
            console.log(error)
            setIsError(error);
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