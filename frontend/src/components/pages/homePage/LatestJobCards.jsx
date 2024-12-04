import React from 'react'

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-base-100 border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='font-medium text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='font-medium text-sm text-gray-600'>Description</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <span className="badge badge-outline text-blue-700 font-bold">12 Positions</span>
                <span className="badge badge-outline text-[#F83002] font-bold">Part Time</span>
                <span className="badge badge-outline text-[#7209b7] font-bold">24LPA</span>
            </div>
        </div>
    )
}

export default LatestJobCards