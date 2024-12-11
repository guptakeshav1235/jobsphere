import React, { useState } from 'react'
import Navbar from '../../../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex justify-between my-5'>
                    <input
                        type="text"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                        className="input input-bordered w-fit"
                    />
                    <button
                        onClick={() => navigate('/admin/companies/create')}
                        className="btn btn-primary w-fit my-2">
                        New Company
                    </button>
                </div>
                <CompaniesTable filter={input} />
            </div>
        </div>
    )
}

export default Companies