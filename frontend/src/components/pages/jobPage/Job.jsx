import React from 'react'
import { FaRegBookmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "qt21yiody32o43i";

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
                <button className='btn rounded-full'>
                    <FaRegBookmark />
                </button>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <button className="btn rounded-md h-auto">
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                        <div className="avatar">
                            <div className="w-12">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                </button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="badge badge-outline text-blue-700 font-bold">{job?.position} Positions</span>
                <span className="badge badge-outline text-[#F83002] font-bold">{job?.jobType}</span>
                <span className="badge badge-outline text-[#7209b7] font-bold">{job?.salary}LPA</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <button className='btn btn-outline btn-accent' onClick={() => navigate(`/job/description/${job?.id}`)}>Details</button>
                <button className='btn text-white bg-[#6A38C2] hover:bg-[#461e89]'>Save For Later</button>
            </div>
        </div>
    )
}

export default Job