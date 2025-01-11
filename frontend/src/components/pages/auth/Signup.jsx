import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../shared/LoadingSpinner';

const Signup = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const { mutate: register, isPending: isRegister } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch('url/api/user/register', {
                    method: "POST",
                    body: formData,
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
        onSuccess: (data) => {
            navigate('/');
            toast.success(data.message);
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

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(input);

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        register(formData);
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
                <form onSubmit={submitHandler} className="w-full max-w-2xl border border-gray-200 rounded-lg p-6 shadow-lg my-4">
                    <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

                    {/* Full Name */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Full Name</span>
                        </label>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your full name"
                            className="input input-bordered w-full"
                        />
                    </div>

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

                    {/* Phone Number */}
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Phone Number</span>
                        </label>
                        <input
                            type="number"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
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

                        {/* Profile */}
                        <div className="flex items-center">
                            <label className="label">
                                <span className="label-text font-medium">Profile</span>
                            </label>
                            <input
                                accept='image/*'
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>

                    </div>

                    {/* Submit Button */}
                    {
                        isRegister ?
                            <button className="btn btn-primary w-full my-2" >
                                <LoadingSpinner />
                                Please Wait
                            </button> :
                            <button type="submit" className="btn btn-primary w-full my-2">
                                Register
                            </button>
                    }
                    <span>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
