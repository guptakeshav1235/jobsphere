import React, { useState } from 'react'
import Navbar from '../../../shared/Navbar'
import useGetAllCompanies from '../../../hooks/useGetAllCompanies';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experience: "",
        location: "",
        jobType: "",
        position: 0,
        companyId: "",
    });

    const { getAllCompanies } = useGetAllCompanies();

    const { mutate: postJob, isPending: isPosting } = useMutation({
        mutationFn: async (input) => {
            try {
                const res = await fetch('/url/api/job/post', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(input),
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
            toast.success("Job posted successfully");
            navigate('/admin/jobs');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const value = e.target.value;
        const selectedCompany = getAllCompanies?.find(company => company?.name?.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?.id });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        postJob(input);
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-6 max-w-4xl border border-gray-200 rounded-lg shadow-lg my-6'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Descriptions</span>
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Requirements</span>
                            </label>
                            <input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Salary</span>
                            </label>
                            <input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Experience</span>
                            </label>
                            <input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Location</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Job Type</span>
                            </label>
                            <input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">No of Position</span>
                            </label>
                            <input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        {
                            getAllCompanies?.length > 0 && (
                                <select
                                    onChange={selectChangeHandler}
                                    className="select select-bordered w-full max-w-xs"
                                >
                                    <option disabled selected>Select a Company</option>
                                    {
                                        getAllCompanies?.map(company => {
                                            return (
                                                <option
                                                    key={company?.id}
                                                    value={company?.name?.toLowerCase()}
                                                >{company?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            )
                        }
                    </div>
                    {
                        isPosting ?
                            <button className="btn btn-primary w-full my-2" >
                                <LoadingSpinner />
                                Please Wait
                            </button> :
                            <button type="submit" className="btn btn-primary w-full my-2">
                                Post New Job
                            </button>
                    }
                    {
                        getAllCompanies?.length === 0 && <p className='text-sm text-red-600 font-bold text-center my-3'>*Please register a company first, before posting jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob