import React, { useEffect, useState } from 'react'
import Navbar from '../../../shared/Navbar'
import { FaArrowLeft } from 'react-icons/fa6'
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useGetCompanyById from '../../../hooks/useGetCompanyById';

const CompanyInfo = () => {
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const { id: companyId } = useParams();
    const navigate = useNavigate();

    const { getSingleCompany } = useGetCompanyById(companyId);

    const { mutate: updateCompany, isPending: isUpdateCompany } = useMutation({
        mutationFn: async (formData) => {
            try {
                const res = await fetch(`/url/api/company/update/${companyId}`, {
                    method: "PUT",
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
        onSuccess: () => {
            toast.success("Company Updated Successfully");
            navigate('/admin/companies');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

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
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }
        updateCompany(formData);
    }

    useEffect(() => {
        setInput({
            name: getSingleCompany?.name || "",
            description: getSingleCompany?.description || "",
            website: getSingleCompany?.website || "",
            location: getSingleCompany?.location || "",
            file: getSingleCompany?.file || null
        })
    }, [getSingleCompany]);
    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/companies')}
                            className="btn btn-outline flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-500 hover:bg-base-100">
                            <FaArrowLeft />
                            <span>Back</span>
                        </button>
                        <h1 className='font-bold text-xl'>Company Info</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Company Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="input input-bordered w-full my-2"
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
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
                                <span className="label-text font-medium">Website</span>
                            </label>
                            <input
                                type="text"
                                name="website"
                                value={input.website}
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
                                <span className="label-text font-medium">Logo</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        isUpdateCompany ?
                            <button className="btn btn-primary w-full mt-8" >
                                <LoadingSpinner />
                                Please Wait
                            </button> :
                            <button type="submit" className="btn btn-primary w-full mt-8">
                                Update
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanyInfo