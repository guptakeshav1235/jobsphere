import React from 'react';
import LatestJobCards from './LatestJobCards';

const LatestJobs = ({ getAllJobs }) => {
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <h1 className='text-3xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    getAllJobs.length <= 0 ? (
                        <span>No Jobs Available</span> // Message when no jobs are found
                    ) : (
                        getAllJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job?.id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default LatestJobs;
