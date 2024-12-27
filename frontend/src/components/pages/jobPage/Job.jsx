import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegBookmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../shared/LoadingSpinner';
import { IoBookmark } from 'react-icons/io5';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const { data: getSavedJob } = useQuery({ queryKey: ["savedJob"] });
    const queryClient = useQueryClient();

    const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

    const isSaved = getSavedJob?.some((savedJob) => savedJob.id === job?.id);

    const { mutate: SavedJob, isPending: isSavingJob } = useMutation({
        mutationFn: async (jobId) => {
            try {
                const res = await fetch('/url/api/saved/jobs', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jobId),
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
        onMutate: () => setIsBookmarkLoading(true),
        onSuccess: () => {
            toast.success("Job saved successfully");
            queryClient.invalidateQueries({ queryKey: ["savedJob"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSettled: () => setIsBookmarkLoading(false)
    });

    const SavedJobHandler = (jobId) => {
        if (!isSaved) {
            SavedJob(jobId);
        }
    };

    const daysAgoFunc = (createdTime) => {
        const createdAt = new Date(createdTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };
    return (
        <div className='p-5 rounded-md shadow-2xl bg-base-100 border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" : `${daysAgoFunc(job?.createdAt)}days ago`}</p>
                <button
                    onClick={() => SavedJobHandler(job?.id)}
                    className='btn rounded-full'
                >
                    {isBookmarkLoading ? (
                        <LoadingSpinner />
                    ) : isSaved ? (
                        <IoBookmark />
                    ) : (
                        <FaRegBookmark />
                    )}
                </button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <button className="btn rounded-md h-auto">
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                        <div className="avatar">
                            <div className="w-12">
                                <img src={job?.company?.logo} />
                            </div>
                        </div>
                    </div>
                </button>
                <div>
                    <h1 className='font-medium text-lg line-clamp-1'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-1'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="badge badge-outline text-blue-700 font-bold">{job?.position} Positions</span>
                <span className="badge badge-outline text-[#F83002] font-bold">{job?.jobType}</span>
                <span className="badge badge-outline text-[#7209b7] font-bold">{job?.salary}LPA</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <button className='btn btn-outline btn-accent' onClick={() => navigate(`/job/description/${job?.id}`)}>Details</button>
                {
                    isSavingJob ?
                        <button className="btn text-white bg-[#6A38C2]" >
                            <LoadingSpinner />
                            Please Wait
                        </button> :
                        <button
                            onClick={() => SavedJobHandler(job?.id)}
                            className={`rounded-lg ${isSaved ? 'btn text-white bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'btn text-white bg-[#6A38C2] hover:bg-[#461e89]'}`}
                        >
                            {isSaved ? 'Already Saved' : 'Save For Later'}
                        </button>
                }
            </div>
        </div>
    )
}

export default Job