import React, { useState } from 'react'
import Navbar from '../../../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../shared/LoadingSpinner';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");

    const { mutate: createCompany, isPending: isCreateCompany } = useMutation({
        mutationFn: async ({ companyName }) => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/company/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ companyName }),
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
            toast.success("Company Registered Successfully");
            const companyId = data?.id;
            navigate(`/admin/companies/${companyId}`);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const registerCompanyHandler = () => {
        createCompany({ companyName });
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
                </div>
                <label className="label">
                    <span className="label-text font-medium">Company Name</span>
                </label>
                <input
                    type="text"
                    placeholder="jobSphere, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="input input-bordered w-full my-2"
                />
                <div className="flex item-center gap-2 my-10">
                    <button
                        onClick={() => navigate('/admin/companies')}
                        className="btn btn-outline">
                        Cancel
                    </button>
                    {
                        isCreateCompany ?
                            <button className="btn btn-primary" >
                                <LoadingSpinner />
                                Please Wait
                            </button> :
                            <button
                                onClick={registerCompanyHandler}
                                className="btn btn-primary">
                                Continue
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCompany