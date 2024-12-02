import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/pages/auth/Login'
import Signup from './components/pages/auth/Signup'
import Home from './components/pages/homePage/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
