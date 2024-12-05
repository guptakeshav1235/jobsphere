import React from 'react'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40K", "42-1lakh", "1lakh-5lakh"]
    },
]

const FilterCard = () => {
    return (
        <div className='w-full bg-base-200 p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <div>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg my-2'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className='flex items-center' key={index}>
                                            <input
                                                type="radio"
                                                name={data.filterType}
                                                value="item"
                                                className="radio"
                                            />
                                            <label className="label">
                                                <span className="label-text font-medium">{item}</span>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard