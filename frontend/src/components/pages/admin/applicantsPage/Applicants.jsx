import React, { useEffect } from 'react'
import Navbar from '../../../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const Applicants = () => {
    const { id: jobId } = useParams();
    const { data: getApplicants, isLoading: isApplicantsLoading } = useQuery({
        queryKey: ['applicants', jobId],
        queryFn: async () => {
            try {
                const res = await fetch(`/url/api/application/${jobId}/applicants`, {
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
                isApplicantsLoading ? (
                    <div>
                        <span>Loading...</span>
                    </div>
                ) :
                    <div className='max-w-7xl mx-auto'>
                        <h1 className='font-bold text-xl my-5'>Applicants ({getApplicants?.applications?.length})</h1>
                        <ApplicantsTable jobId={jobId} />
                    </div>
            }

        </div>
    )
}

export default Applicants