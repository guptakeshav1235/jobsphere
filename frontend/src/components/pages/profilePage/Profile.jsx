import React from 'react'
import Navbar from '../../shared/Navbar'
import { MdModeEditOutline, MdOutlineEmail } from 'react-icons/md'
import { LuContact } from 'react-icons/lu'
import AppliedJobTable from './AppliedJobTable'

const skills = ["C/C++", "C#", "JavaScript", "React.js", "ASP.NET core"]
const Profile = () => {
    const isResume = true;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-base-200 border border-gray-400 rounded-2xl my-14 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className="avatar">
                            <div className="w-20 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Description</p>
                        </div>
                    </div>
                    <button className='btn btn-outline btn-accent text-right'><MdModeEditOutline /></button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <MdOutlineEmail />
                        <span>guptakeshav1235@gmail.com</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <LuContact />
                        <span>9456939893</span>
                    </div>
                </div>
                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            skills.length !== 0 ? skills.map((item, index) => (
                                <span className="badge badge-neutral" key={index}>{item}</span>
                            )) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-2'>
                    <label className="label">
                        <span className="label-text text-lg font-bold">Resume</span>
                    </label>
                    {
                        isResume ? <a target='blank' href='https://www.google.com' className='-mt-4 text-blue-500 w-full hover:underline cursor-pointer'>Keshav Gupta</a> : <span>NA</span>
                    }
                </div>
            </div>
            <h1 className='flex justify-center font-bold text-lg my-5 mx-2'>Applied Jobs</h1>
            <div className='max-w-4xl mx-auto bg-base-200 rounded-2-xl'>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
        </div>
    )
}

export default Profile