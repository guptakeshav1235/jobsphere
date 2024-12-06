import React from 'react'

const JobDescription = () => {
    const isApplied = true;
    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>Frontend Developer</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <span className="badge badge-outline text-blue-700 font-bold">12 Positions</span>
                        <span className="badge badge-outline text-[#F83002] font-bold">Part Time</span>
                        <span className="badge badge-outline text-[#7209b7] font-bold">24LPA</span>
                    </div>
                </div>
                <button
                    className={`rounded-lg ${isApplied ? 'btn text-white bg-gray-500 cursor-not-allowed hover:bg-gray-500' : 'btn text-white bg-[#6A38C2] hover:bg-[#461e89]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </button>
            </div>
            <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Developer</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Bangalore</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Eligible Candidates has the relevent experience in React.js skills for the position </span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>1 yr</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>06-12-2024</span></h1>
            </div>
        </div>
    )
}

export default JobDescription