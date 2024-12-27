import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { FiLogOut, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner';

const Navbar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: authUser, isLoading, isFetching } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch('/url/api/user/me', {
                    credentials: "include"
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;

            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });

    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/url/api/user/logout', {
                    method: "POST",
                    credentials: "include"
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            navigate('/');
            //refetch the authUser
            queryClient.setQueryData(["authUser"], null);
            toast.success("User logged-out successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Logout failed");
        }
    });

    // const user = false;

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Sphere</span></h1>
                </div>
                <div className='flex items-center gap-3'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            authUser && authUser.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !isLoading && !isFetching ? (
                            !authUser ? (
                                <div className='flex items-center gap-2 my-3'>
                                    <Link to='/login'><button className="btn btn-outline btn-accent">Login</button></Link>
                                    <Link to='/signup'><button className="btn text-white bg-[#6A38C2] hover:bg-[#461e89]">Signup</button></Link>
                                </div>
                            ) : (
                                <div className="dropdown dropdown-end my-3">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={authUser?.profile?.profilePhoto} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-[#cbc9c8] rounded-box z-[1] w-80 py-2 shadow">
                                        <div className=''>

                                            <div className='flex gap-2 space-y-2'>
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar my-2">
                                                    <div className="w-24 rounded-full">
                                                        <img src={authUser?.profile?.profilePhoto} />
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <h4 className='text-lg font-bold'>{authUser?.fullName}</h4>
                                                    <p className='text-lg text-gray-500'>{authUser?.profile?.bio}</p>
                                                </div>
                                            </div>

                                            <div className='p-4 text-[18px] font-medium flex flex-col gap-3 text-gray-600'>
                                                {
                                                    authUser && authUser.role === 'student' && (
                                                        <>
                                                            <div className='flex w-fit items-center gap-4'>
                                                                <FiUser />
                                                                <a
                                                                    role="button"
                                                                    className="relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full"
                                                                >
                                                                    <Link to='/profile'>View Profile</Link>
                                                                </a>
                                                            </div>
                                                            <div className='flex w-fit items-center gap-4'>
                                                                <FiUser />
                                                                <a
                                                                    role="button"
                                                                    className="relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full"
                                                                >
                                                                    <Link to='/saved/jobs'>SavedJobs</Link>
                                                                </a>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                <div className='flex w-fit items-center gap-4'>
                                                    <FiLogOut />
                                                    <a
                                                        role="button"
                                                        className="relative overflow-hidden before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-current before:transition-all before:duration-300 hover:before:w-full"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            logout();
                                                        }}
                                                    >
                                                        Logout
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            )
                        ) : (
                            <div><LoadingSpinner /></div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar