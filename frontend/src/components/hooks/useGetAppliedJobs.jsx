import { useQuery } from '@tanstack/react-query';
import React from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetAppliedJobs = () => {
    const { data: getAppliedJobs, isLoading: isApplied, error: isError } = useQuery({
        queryKey: ["appliedJobs"],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/application/get`, {
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
    return { getAppliedJobs, isApplied, isError };
}

export default useGetAppliedJobs