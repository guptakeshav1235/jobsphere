import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Navbar from '../../shared/Navbar';
import LatestJobCards from '../homePage/LatestJobCards';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SavedJob = () => {
    const { data: getSavedJob, isLoading } = useQuery({
        queryKey: ["savedJob"],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/saved/jobs`, {
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
    return (
        <div>
            <Navbar />
            {
                isLoading ?
                    <div className='flex justify-center items-center'>
                        Loading...
                    </div> :
                    <div className='max-w-7xl mx-auto my-10'>
                        <h1 className='text-3xl font-bold mb-5'>Your Saved Jobs</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {getSavedJob?.length === 0 ? (
                                <p>No jobs saved yet.</p>
                            ) : (
                                getSavedJob?.map((job) => <LatestJobCards key={job?.id} job={job} />)
                            )}
                        </div>
                    </div>
            }
        </div>
    )
}

export default SavedJob