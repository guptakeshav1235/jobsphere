import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import Home from './components/pages/homePage/Home'
import { Toaster } from 'react-hot-toast'
import Jobs from './components/pages/jobPage/Jobs'
import Browse from './components/pages/browsePage/Browse'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='//browse' element={<Browse />} />
      </Routes>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
