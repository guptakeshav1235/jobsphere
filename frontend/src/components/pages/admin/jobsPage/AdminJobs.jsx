import React, { useState } from 'react'
import Navbar from '../../../shared/Navbar'
import AdminJobsTable from './AdminJobsTable';
import { useNavigate } from 'react-router-dom';

const AdminJobs = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex justify-between my-5'>
                    <input
                        type="text"
                        placeholder="Filter by name, role"
                        onChange={(e) => setInput(e.target.value)}
                        className="input input-bordered w-fit"
                    />
                    <button
                        onClick={() => navigate('/admin/jobs/create')}
                        className="btn btn-primary w-fit my-2">
                        New Jobs
                    </button>
                </div>
                <AdminJobsTable filter={input} />
            </div>
        </div>
    )
}

export default AdminJobs