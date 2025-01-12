import { useQuery } from '@tanstack/react-query'
import React from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetAllJobs = (keyword = "") => {
    const { data: getAllJobs = [], isLoading } = useQuery({
        queryKey: ["allJobs", keyword],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/job/get?keyword=${encodeURIComponent(keyword)}`, {
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