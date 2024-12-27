import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import Home from './components/pages/homePage/Home'
import { Toaster } from 'react-hot-toast'
import Jobs from './components/pages/jobPage/Jobs'
import Browse from './components/pages/browsePage/Browse'
import Profile from './components/pages/profilePage/Profile'
import JobDescription from './components/pages/jobDescriptionPage/JobDescription'
import useGetAllJobs from './components/hooks/useGetAllJobs'
import Companies from './components/pages/admin/companiesPage/Companies'
import CreateCompany from './components/pages/admin/companiesPage/CreateCompany'
import CompanyInfo from './components/pages/admin/companiesPage/CompanyInfo'
import AdminJobs from './components/pages/admin/jobsPage/AdminJobs'
import PostJob from './components/pages/admin/jobsPage/PostJob'
import Applicants from './components/pages/admin/applicantsPage/Applicants'
import PrivateRoutes from './components/protectRoutes/PrivateRoutes'
import SavedJob from './components/pages/savedJobPage/SavedJob'
import PublicRoutes from './components/protectRoutes/PublicRoutes'
import { useQuery } from '@tanstack/react-query'

function App() {
  const { getAllJobs, isLoading } = useGetAllJobs();
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<PublicRoutes><Jobs getAllJobs={getAllJobs} isLoading={isLoading} /> </PublicRoutes>} />
        <Route path='/job/description/:id' element={<PublicRoutes><JobDescription /></PublicRoutes>} />
        <Route path='/browse' element={<PublicRoutes><Browse /></PublicRoutes>} />
        <Route path='/profile' element={<PublicRoutes><Profile /></PublicRoutes>} />
        <Route path='/saved/jobs' element={<PublicRoutes><SavedJob /></PublicRoutes>} />

        {/* Implementing routes for admin */}
        <Route path='/admin/companies' element={<PrivateRoutes><Companies /></PrivateRoutes>} />
        <Route path='/admin/companies/create' element={<PrivateRoutes><CreateCompany /></PrivateRoutes>} />
        <Route path='/admin/companies/:id' element={<PrivateRoutes><CompanyInfo /></PrivateRoutes>} />
        <Route path='/admin/jobs' element={<PrivateRoutes><AdminJobs /></PrivateRoutes>} />
        <Route path='/admin/jobs/create' element={<PrivateRoutes><PostJob /></PrivateRoutes>} />
        <Route path='/admin/jobs/:id/applicants' element={<PrivateRoutes><Applicants /></PrivateRoutes>} />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
