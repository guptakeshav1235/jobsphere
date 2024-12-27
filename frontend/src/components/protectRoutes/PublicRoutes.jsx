
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PublicRoutes = ({ children }) => {
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser === null || authUser?.role !== 'student')
            navigate('/');
    }, []);
    return (
        <>
            {children}
        </>
    )
}

export default PublicRoutes