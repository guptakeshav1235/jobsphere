import { useQuery } from '@tanstack/react-query'
import React from 'react'

const useGetAllAdminJobs = () => {
    const { data: getAllAdminJobs } = useQuery({
        queryKey: ["allAdminJobs"],
        queryFn: async () => {
            try {
                const res = await fetch('/url/api/job/getadminjobs', {
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
    return { getAllAdminJobs };
}

export default useGetAllAdminJobs