import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Navbar from '../../shared/Navbar';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../shared/LoadingSpinner';

const JobDescription = () => {
    const { id: jobId } = useParams();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const queryClient = useQueryClient();

    console.log("AuthUser ID:", authUser?.id);

    const { data: getSingleJob, isLoading: isJobLoading } = useQuery({
        queryKey: ["singlejob", jobId],
        queryFn: async () => {
            try {
                const res = await fetch(`/url/api/job/get/${jobId}`, {
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

    const { mutate: applyJob, isPending: isApplyJob } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/url/api/application/apply/${jobId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success("Job Applied Successfully");
            //refetch the authUser
            Promise.all([
                queryClient.invalidateQueries({ queryKey: ["singlejob"] }),
                queryClient.invalidateQueries({ queryKey: ["authUser"] })
            ])
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const applyJobHandler = () => {
        applyJob();
    }
    const isApplied = getSingleJob?.applications?.some(a => a.applicant?.applicantId === authUser?.id) || false;

    return (
        <div>
            <Navbar />
            {
                isJobLoading ? (
                    <div>
                        <span className='flex justify-center'>Loading...</span>
                    </div>
                ) :
                    <div className='max-w-7xl mx-auto my-10'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='font-bold text-xl'>{getSingleJob?.title}</h1>
                                <div className='flex items-center gap-2 mt-4'>
                                    <span className="badge badge-outline text-blue-700 font-bold">{getSingleJob?.position} Positions</span>
                                    <span className="badge badge-outline text-[#F83002] font-bold">{getSingleJob?.jobType}</span>
                                    <span className="badge badge-outline text-[#7209b7] font-bold">{getSingleJob?.salary}LPA</span>
                                </div>
                            </div>

                            {
                                isApplyJob ?
                                    <button
                                        className={`rounded-lg ${isApplied ? 'btn text-white bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'btn text-white bg-[#6A38C2] hover:bg-[#461e89]'}`}>
                                        <LoadingSpinner />
                                        Please Wait
                                    </button> :
                                    <button
                                        onClick={isApplied ? null : applyJobHandler}
                                        className={`rounded-lg ${isApplied ? 'btn text-white bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'btn text-white bg-[#6A38C2] hover:bg-[#461e89]'}`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </button>
                            }

                        </div>
                        <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>Job Description</h1>
                        <div className='my-4'>
                            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.title}</span></h1>
                            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.location}</span></h1>
                            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.description} </span></h1>
                            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.experienceLevel} yr</span></h1>
                            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.salary}LPA</span></h1>
                            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.applications?.length}</span></h1>
                            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{getSingleJob?.createdAt?.split("T")[0]}</span></h1>
                        </div>
                    </div>
            }
        </div>
    )
}

export default JobDescription