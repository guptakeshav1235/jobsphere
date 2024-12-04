import React from 'react'
import { BiSearch } from 'react-icons/bi'

const HeroSection = () => {
    return (
        // <div className="hero bg-base-200 py-10">
        <div className="py-16">

            {/* Hero Text */}
            <div className='text-center'>
                <h1 className="text-4xl font-bold text-[#F83002] mb-2">Welcome to Job Sphere</h1>
                <h1 className='text-3xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className="py-4 text-lg text-neutral">
                    Discover your dream job or find the perfect candidate – all in one place. Let's make your career journey easier.
                </p>

                {/* Search Bar */}
                <div className="flex w-[60%] items-center max-w-md mb-4 mx-auto">
                    <input
                        type="text"
                        placeholder="Search by job title, keyword, or location"
                        className="input input-bordered w-full"
                    />
                    <button className="btn btn-primary rounded-r-full">
                        <BiSearch className='h-5 w-5' />
                    </button>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-4">
                    <button className="btn btn-secondary rounded-lg">Find Jobs</button>
                    <button className="btn btn-accent rounded-lg">Post a Job</button>
                </div> */}
            </div>
        </div>
        // </div>

    )
}

export default HeroSection