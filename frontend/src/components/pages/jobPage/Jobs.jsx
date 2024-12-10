import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import Footer from '../../shared/Footer';

const Jobs = ({ getAllJobs, isLoading }) => {
    const jobs = getAllJobs;
    return (
        <div>
            <Navbar />
            <div className='flex max-w-7xl mx-auto mt-5 gap-5'>
                <div className='w-[20%]'>
                    <FilterCard />
                </div>
                {
                    isLoading ? (
                        <div>
                            <span>Loading...</span>
                        </div>
                    ) : jobs.length === 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    jobs.map((job) => (
                                        <div key={job?.id}>
                                            <Job job={job} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default Jobs;
