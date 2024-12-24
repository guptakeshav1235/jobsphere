import { Route, Routes } from 'react-router-dom'
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
import ProtectedRoutes from './components/pages/admin/ProtectedRoutes'

function App() {
  const { getAllJobs, isLoading } = useGetAllJobs();
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<Jobs getAllJobs={getAllJobs} isLoading={isLoading} />} />
        <Route path='/job/description/:id' element={<JobDescription />} />
        <Route path='/browse' element={<Browse />} />
        <Route path='/profile' element={<Profile />} />

        {/* Implementing routes for admin */}
        <Route path='/admin/companies' element={<ProtectedRoutes><Companies /></ProtectedRoutes>} />
        <Route path='/admin/companies/create' element={<ProtectedRoutes><CreateCompany /></ProtectedRoutes>} />
        <Route path='/admin/companies/:id' element={<ProtectedRoutes><CompanyInfo /></ProtectedRoutes>} />
        <Route path='/admin/jobs' element={<ProtectedRoutes><AdminJobs /></ProtectedRoutes>} />
        <Route path='/admin/jobs/create' element={<ProtectedRoutes><PostJob /></ProtectedRoutes>} />
        <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoutes><Applicants /></ProtectedRoutes>} />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
