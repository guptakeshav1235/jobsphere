import React from 'react'
import useGetAppliedJobs from '../../hooks/useGetAppliedJobs';

const AppliedJobTable = ({ getAppliedJobs }) => {
    // const { getAppliedJobs } = useGetAppliedJobs();
    console.log("getAppliedJobs", getAppliedJobs);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='border border-gray-200'>
                        <th>Date</th>
                        <th>Job Role</th>
                        <th>Company</th>
                        <th className='text-right'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getAppliedJobs?.map((appliedJob) => (
                            <tr key={appliedJob?.id} className='border border-gray-200 cursor-pointer hover:bg-base-300'>
                                <td>{appliedJob?.createdAt?.split("T")[0]}</td>
                                <td>{appliedJob?.job?.title}</td>
                                <td>{appliedJob?.job?.company?.name}</td>
                                <td className='text-right'><span className={`badge p-4 text-white ${appliedJob?.status === "rejected" ? 'bg-red-500' : appliedJob?.status === 'pending' ? 'bg-gray-500' : 'bg-green-500'}`}>{appliedJob?.status.toUpperCase()}</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable