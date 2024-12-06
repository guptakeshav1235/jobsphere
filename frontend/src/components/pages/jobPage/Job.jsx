import React from 'react'
import { FaRegBookmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const Job = () => {
    const navigate = useNavigate();
    const jobId = "qt21yiody32o43i";
    return (
        <div className='p-5 rounded-md shadow-2xl bg-base-100 border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
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
                    <h1 className='font-medium text-lg'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Description</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="badge badge-outline text-blue-700 font-bold">12 Positions</span>
                <span className="badge badge-outline text-[#F83002] font-bold">Part Time</span>
                <span className="badge badge-outline text-[#7209b7] font-bold">24LPA</span>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <button className='btn btn-outline btn-accent' onClick={() => navigate(`/job/description/${jobId}`)}>Details</button>
                <button className='btn text-white bg-[#6A38C2] hover:bg-[#461e89]'>Save For Later</button>
            </div>
        </div>
    )
}

export default Job