import React from 'react'
import Navbar from '../../shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '../../shared/Footer'
import useGetAllJobs from '../../hooks/useGetAllJobs'

const Home = () => {
    const { getAllJobs } = useGetAllJobs();
    return (
        <div>
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs getAllJobs={getAllJobs} />
            <Footer />
        </div>
    )
}

export default Home