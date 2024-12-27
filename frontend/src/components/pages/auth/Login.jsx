import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/Navbar'
import LoadingSpinner from '../../shared/LoadingSpinner'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { mutate: login, isPending: isLogin } = useMutation({
        mutationFn: async ({ email, password, role }) => {
            try {
                const res = await fetch('url/api/user/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password, role }),
                    credentials: "include"
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        onSuccess: () => {
            // navigate('/');
            toast.success("User logged-in successfully");
            //refetch the authUser
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(input);
        login({ email: input.email, password: input.password, role: input.role });

    }

    useEffect(() => {
        if (authUser) {
            navigate('/')
        }
    }, [authUser]);
    return (
        <div className='h-screen overflow-hidden'>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-full max-w-2xl border border-gray-200 rounded-lg p-6 shadow-lg my-10">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

                    {/* Email */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Roles */}
                    <div className="flex gap-5">
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="radio radio-primary"
                            />
                            <label className="label">
                                <span className="label-text font-medium">Student</span>
                            </label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="radio radio-primary" />
                            <label className="label">
                                <span className="label-text font-medium">Recruiter</span>
                            </label>
                        </div>

                    </div>

                    {/* Submit Button */}
                    {
                        isLogin ?
                            <button className="btn btn-primary w-full my-2" >
                                <LoadingSpinner />
                                Please Wait
                            </button> :
                            <button type="submit" className="btn btn-primary w-full my-2">
                                Login
                            </button>
                    }
                    <span>Don't have an account? <Link to="/signup" className='text-blue-600'>Register</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login