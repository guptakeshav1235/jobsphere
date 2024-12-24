import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const LatestJobs = ({ getAllJobs, isLoading }) => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-3xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            {
                !authUser ?
                    <>
                        <span className="flex flex-col items-center justify-center gap-3 p-4 border rounded-lg shadow-md bg-red-50 text-red-700 mt-6">
                            <span className="text-lg font-semibold">
                                *Please login to the Job Sphere to explore opportunities if you want to apply for the job.
                            </span>
                            <Link
                                to="/login"
                                className="btn btn-outline btn-error hover:bg-red-500 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                        </span>
                    </>
                    :
                    <>
                        <div className='grid grid-cols-3 gap-4 my-5'>
                            {
                                getAllJobs.length <= 0 ? (
                                    <span>No Jobs Available</span> // Message when no jobs are found
                                ) : (
                                    getAllJobs.slice(0, 3).map((job) => (
                                        <LatestJobCards key={job?.id} job={job} />
                                    ))
                                )
                            }
                        </div>
                    </>
            }
        </div>
    );
}

export default LatestJobs;
