import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const useGetCompanyById = (companyId) => {
    const { data: getSingleCompany } = useQuery({
        queryKey: ["singleCompany", companyId],
        queryFn: async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/company/get/${companyId}`, {
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
    return { getSingleCompany };
}

export default useGetCompanyById