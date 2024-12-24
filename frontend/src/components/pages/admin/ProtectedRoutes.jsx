import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser === null || authUser?.role !== 'recruiter')
            navigate('/');
    }, []);
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoutes