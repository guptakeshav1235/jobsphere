import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const ApplicantsTable = ({ jobId }) => {
    const statusArray = ["Accepted", "Rejected"];
    const navigate = useNavigate();
    const { data: getApplicants } = useQuery({ queryKey: ['applicants', jobId] });

    const { mutate: updateStatus } = useMutation({
        mutationFn: async ({ status, id }) => {
            try {
                const res = await fetch(`/url/api/application/${id}/status/update`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status }),
                    credentials: "include",
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
            toast.success("Status updated successfully");
            navigate('/admin/jobs');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const statusHandler = (status, id) => {
        updateStatus({ status, id });
    };
    return (
        <div>
            <table className="table">
                <thead>
                    <tr className='text-[16px] border-t border-b border-gray-400'>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Resume</th>
                        <th>Date</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getApplicants && getApplicants?.applications?.map((item) => (
                            <tr key={item?.applicationId} className='border-t border-b border-gray-400'>
                                <td>{item?.applicant?.fullName}</td>
                                <td>{item?.applicant?.email}</td>
                                <td>{item?.applicant?.phoneNumber}</td>
                                <td className='text-blue-600'><a href={item?.applicant?.profile?.resume} target='_blank'>{item?.applicant?.profile?.resumeOriginalName}</a></td>
                                <td>{item?.createdAt?.split("T")[0]}</td>
                                <td className='text-right cursor-pointer'>
                                    <div className="dropdown my-3 text">
                                        <div tabIndex={0}>
                                            <div className="">
                                                <IoEllipsisHorizontal />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-[#f7f5f5] rounded-box z-[1] w-24 py-3 shadow">
                                            <div className=''>
                                                <div className=''>
                                                    {
                                                        statusArray.map((status, index) => {
                                                            return (
                                                                <div onClick={() => statusHandler(status, item?.applicationId)} key={index} className='flex w-fit justify-center m-3'>
                                                                    <span>{status}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ApplicantsTable