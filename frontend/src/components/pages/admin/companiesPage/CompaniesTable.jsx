import React, { useEffect, useState } from 'react'
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
import useGetAllCompanies from '../../../hooks/useGetAllCompanies';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = ({ filter }) => {
    const { getAllCompanies } = useGetAllCompanies();
    const [filterCompany, setFilterCompany] = useState(getAllCompanies);

    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = getAllCompanies?.filter(company =>
            company?.name?.toLowerCase().includes(filter.toLowerCase())
        );
        setFilterCompany(filteredCompany);
    }, [filter, getAllCompanies]);
    return (
        <div className="">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-[16px] border-t border-b border-gray-400'>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th className='text-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterCompany?.length > 0 ? (
                            filterCompany?.map((company) => (
                                <tr key={company.id} className='border-t border-b border-gray-400'>
                                    <td>
                                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                            <div className="avatar">
                                                <div className="w-12">
                                                    <img src={company?.logo} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{company?.name}</td>
                                    <td>{company?.createdAt?.split("T")[0]}</td>
                                    <td className='text-right cursor-pointer'>
                                        <div className="dropdown my-3 text">
                                            <div tabIndex={0}>
                                                <div className="">
                                                    <IoEllipsisHorizontal />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-[#f7f5f5] rounded-box z-[1] w-32 py-5 shadow">
                                                <div className=''>
                                                    <div onClick={() => navigate(`/admin/companies/${company?.id}`)} className='flex items-center gap-2 w-fit'>
                                                        <MdEdit />
                                                        <span>Edit</span>
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
                                    No companies found.
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CompaniesTable