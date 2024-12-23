import React, { useEffect, useState } from 'react'
import { IoEllipsisHorizontal, IoEye } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '../../../hooks/useGetAllAdminJobs';

const AdminJobsTable = ({ filter }) => {
    const { getAllAdminJobs } = useGetAllAdminJobs();
    const [filterJob, setFilterJob] = useState(getAllAdminJobs);

    const navigate = useNavigate();

    useEffect(() => {
        const filteredJob = getAllAdminJobs?.filter(job =>
            job?.company?.name?.toLowerCase().includes(filter.toLowerCase()) || job?.title?.toLowerCase().includes(filter.toLowerCase())
        );
        setFilterJob(filteredJob);
    }, [filter, getAllAdminJobs]);
    return (
        <div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-[16px] border-t border-b border-gray-400'>
                        <th>Company Name</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterJob?.length > 0 ? (
                            filterJob?.map((job) => (
                                <tr key={job?.id} className='border-t border-b border-gray-400'>
                                    <td>{job?.company?.name}</td>
                                    <td>{job?.title}</td>
                                    <td>{job?.createdAt?.split("T")[0]}</td>
                                    <td className='text-right cursor-pointer'>
                                        <div className="dropdown my-3 text">
                                            <div tabIndex={0}>
                                                <div className="">
                                                    <IoEllipsisHorizontal />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-[#f7f5f5] rounded-box z-[1] w-32 py-5 shadow">
                                                <div className=''>
                                                    <div onClick={() => navigate(`/admin/companies/${job?.id}`)} className='flex items-center gap-2 w-fit'>
                                                        <MdEdit />
                                                        <span>Edit</span>
                                                    </div>
                                                    <div onClick={() => navigate(`/admin/jobs/${job?.id}/applicants`)} className="flex items-center w-fit gap-2 mt-2">
                                                        <IoEye />
                                                        <span>Applicants</span>
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-xl font-medium text-center py-5">
                                    No Jobs found.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminJobsTable