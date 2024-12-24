import React, { useMemo } from 'react';

const FilterCard = ({ selectedFilters, setSelectedFilters, getAllJobs, isLoading }) => {
    const generateSalaryRanges = (minSalary, maxSalary) => {
        const ranges = [];
        const rangeStep = 4; // Step for each salary range (adjust as needed)

        for (let i = minSalary; i <= maxSalary; i += rangeStep) {
            const lower = i;
            const upper = Math.min(i + rangeStep, maxSalary);
            const range = `${lower}LPA-${upper}LPA`;
            ranges.push(range);
        }

        return ranges;
    };

    const filterData = useMemo(() => {
        if (isLoading || !getAllJobs?.length) return [];

        // Extract salary values and convert them to numbers
        const salaries = getAllJobs.map(job => job?.salary).filter(Boolean);
        const minSalary = Math.min(...salaries);
        const maxSalary = Math.max(...salaries);

        // Generate dynamic salary ranges
        const salaryRanges = generateSalaryRanges(minSalary, maxSalary);

        const locations = [...new Set(getAllJobs.map(job => job?.location))];
        const industries = [...new Set(getAllJobs.map(job => job?.title))];

        return [
            { filterType: "Location", array: locations },
            { filterType: "Industry", array: industries },
            { filterType: "Salary", array: salaryRanges }
        ];
    }, [getAllJobs, isLoading]);

    const changeHandler = (filterType, value) => {
        // Update the selected filters by clearing other filter types
        setSelectedFilters({ [filterType]: value });
    };

    return (
        <div className='w-full bg-base-200 p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <div>
                {
                    filterData?.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg my-2'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center' key={itemId}>
                                            <input
                                                type="radio"
                                                name={data.filterType}
                                                value={item}
                                                id={itemId}
                                                checked={selectedFilters[data.filterType] === item}
                                                onChange={() => changeHandler(data.filterType, item)}
                                                className="radio"
                                            />
                                            <label className="label" htmlFor={itemId}>
                                                <span className="label-text font-medium">{item}</span>
                                            </label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FilterCard;