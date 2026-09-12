
export const getDashboardStats = async () => {

    const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch dashboard stats");
    }

    return data;
};


