import React from 'react'
import Navbar from '../../shared/Navbar'
import Job from '../jobPage/Job';
import { useSearchParams } from 'react-router-dom';
import useGetAllJobs from '../../hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('search') || '';
    const { getAllJobs, isLoading } = useGetAllJobs(query);

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='text-lg font-medium'>Search Results ({getAllJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4 mt-5'>
                    {
                        getAllJobs?.map((job) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Job key={job?.id} job={job} />
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse