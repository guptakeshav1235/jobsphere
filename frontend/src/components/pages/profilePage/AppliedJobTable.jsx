import React from 'react'

const AppliedJobTable = () => {
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
                        [1, 2].map((item, index) => (
                            <tr key={index} className='border border-gray-200 cursor-pointer hover:bg-base-300'>
                                <td>06-12-2024</td>
                                <td>Frontend Developer</td>
                                <td>Google</td>
                                <td className='text-right'><span className="badge badge-neutral">Selected</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AppliedJobTable