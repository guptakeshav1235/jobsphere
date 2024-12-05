import React from 'react'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = false;

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-18'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-3'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/jobs'>Jobs</Link></li>
                        <li><Link to='/browse'>Browse</Link></li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2 my-3'>
                                <Link to='/login'><button className="btn btn-outline btn-accent">Login</button></Link>
                                <Link to='/signup'><button className="btn text-white bg-[#6A38C2] hover:bg-[#461e89]">Signup</button></Link>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-end my-3">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-24 rounded-full">
                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Avatar" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-[#cbc9c8] rounded-box z-[1] w-80 py-2 shadow">
                                    <div className=''>

                                        <div className='flex gap-2 space-y-2'>
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar my-2">
                                                <div className="w-24 rounded-full">
                                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className='text-lg font-bold'>Keshav Gupta</h4>
                                                <p className='text-lg text-gray-500'>I'm a Software Developer.</p>
                                            </div>
                                        </div>

                                        <div className='p-4 text-[18px] font-medium flex flex-col gap-3 text-gray-600'>
                                            <div className='flex w-fit items-center gap-4'>
                                                <FiUser />
                                                <a
                                                    role="button"
                                                    className="relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full"
                                                >
                                                    View Profile
                                                </a>
                                            </div>
                                            <div className='flex w-fit items-center gap-4'>
                                                <FiLogOut />
                                                <a
                                                    role="button"
                                                    className="relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full"
                                                >
                                                    Logout
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar