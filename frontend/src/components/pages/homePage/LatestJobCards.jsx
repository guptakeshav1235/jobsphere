import React from 'react'
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`job/description/${job?.id}`)} className='p-5 rounded-md shadow-xl bg-base-100 border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='font-medium text-sm text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='font-medium text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="badge badge-outline text-blue-700 font-bold">{job?.position} Positions</span>
                <span className="badge badge-outline text-[#F83002] font-bold">{job?.jobType}</span>
                <span className="badge badge-outline text-[#7209b7] font-bold">{job?.salary}LPA</span>
            </div>
        </div>
    )
}

export default LatestJobCards