import React, { useEffect } from 'react'
import Navbar from '../../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../../shared/Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { getAllJobs, isLoading } = useGetAllJobs();
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    const navigate = useNavigate();

    useEffect(() => {
        if (authUser?.role === 'recruiter')
            navigate('/admin/companies');
    }, []);
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs getAllJobs={getAllJobs} isLoading={isLoading} />
            <Footer />
        </div>
    )
}

export default Home