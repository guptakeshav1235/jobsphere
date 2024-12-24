import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { motion } from 'framer-motion';

const Jobs = ({ getAllJobs, isLoading }) => {
    const jobs = getAllJobs;
    const [selectedFilters, setSelectedFilters] = useState({});
    const [filterJobs, setFilterJobs] = useState(jobs);

    useEffect(() => {
        const filterKeys = Object.keys(selectedFilters);
        if (filterKeys.length === 0) {
            setFilterJobs(jobs);
            return;
        }

        const filteredJob = jobs?.filter(job => {
            return filterKeys.some(filterType => {
                const selectedValue = selectedFilters[filterType]?.toLowerCase();
                if (filterType === "Location") {
                    return job?.location?.toLowerCase() === selectedValue;
                } else if (filterType === "Industry") {
                    return job?.title?.toLowerCase().includes(selectedValue);
                } else if (filterType === "Salary") {
                    const [min, max] = selectedValue.split('-').map(value => parseInt(value.replace(/\D/g, ''), 10));
                    if (Array.isArray(job?.salary)) {
                        return job.salary.some(salary => {
                            const jobSalary = parseInt(salary.replace(/\D/g, ''), 10);
                            return jobSalary >= min && jobSalary <= max;
                        });
                    } else {
                        const jobSalary = parseInt(job?.salary?.toString().replace(/\D/g, ''), 10);
                        return jobSalary >= min && jobSalary <= max;
                    }
                }
                return false;
            });
        });

        setFilterJobs(filteredJob);
    }, [selectedFilters, jobs]);


    return (
        <div>
            <Navbar />
            <div className='flex max-w-7xl mx-auto mt-5 gap-5'>
                <div className='w-[20%]'>
                    <FilterCard
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        getAllJobs={getAllJobs}
                        isLoading={isLoading}
                    />
                </div>
                {
                    isLoading ? (
                        <div>
                            <span>Loading...</span>
                        </div>
                    ) : filterJobs?.length === 0 ? (
                        <span>Job not found</span>
                    ) : (
                        <div className='flex-1 h-[88vh] pb-5'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                    filterJobs?.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?.id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Jobs;
