import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllJobs = () => {
    const { data: getAllJobs = [], isLoading } = useQuery({
        queryKey: ["allJobs"],
        queryFn: async () => {
            try {
                const res = await fetch('/url/api/job/get', {
                    credentials: "include"
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
    return { getAllJobs, isLoading };
}

export default useGetAllJobs