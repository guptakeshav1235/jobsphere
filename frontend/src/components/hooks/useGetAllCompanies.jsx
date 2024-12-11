import { useQuery } from '@tanstack/react-query';

const useGetAllCompanies = () => {
    const { data: getAllCompanies } = useQuery({
        queryKey: ["allCompanies"],
        queryFn: async () => {
            try {
                const res = await fetch('/url/api/company/get', {
                    credentials: "include"
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
    return { getAllCompanies };
}

export default useGetAllCompanies