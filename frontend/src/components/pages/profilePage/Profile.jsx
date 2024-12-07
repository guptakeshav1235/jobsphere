import React, { useState } from 'react'
import Navbar from '../../shared/Navbar'
import { MdModeEditOutline, MdOutlineEmail } from 'react-icons/md'
import { LuContact } from 'react-icons/lu'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileModal from './UpdateProfileModal'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });

    // const skills = authUser?.profile?.skills
    const isResume = authUser?.profile?.resume;
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-base-200 border border-gray-400 rounded-2xl my-14 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className="avatar">
                            <div className="w-20 rounded-full">
                                <img src={authUser?.profile?.profilePhoto} />
                            </div>
                        </div>
                        <div>
                            <h1 className='font-medium text-xl'>{authUser?.fullName}</h1>
                            <p>{authUser?.profile?.bio}</p>
                        </div>
                    </div>
                    <button className='btn btn-outline btn-accent text-right' onClick={() => setOpen(true)}><MdModeEditOutline /></button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <MdOutlineEmail />
                        <span>{authUser?.email}</span>
                    </div>

                    <div className='flex items-center gap-3 my-2'>
                        <LuContact />
                        <span>{authUser?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            authUser?.profile?.skills.length !== 0 ? authUser?.profile?.skills.map((item, index) => (
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
                        isResume ? <a target='blank' href={authUser?.profile?.resume} className='-mt-4 text-blue-500 w-full hover:underline cursor-pointer'>{authUser?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <h1 className='flex justify-center font-bold text-lg my-5 mx-2'>Applied Jobs</h1>
            <div className='max-w-4xl mx-auto bg-base-200 rounded-2-xl'>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileModal open={open} setOpen={setOpen} authUser={authUser} />
        </div>
    )
}

export default Profile