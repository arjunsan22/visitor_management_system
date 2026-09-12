
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


export const getVisitors = async ({
    page = 1,
    limit = 10,
    search = "",
    department = "",
    status = "",
    visit_date = "",
}) => {

    const params = new URLSearchParams({
        page,
        limit,
        search,
        department,
        status,
        visit_date,
    });

    const response = await fetch(
        `http://localhost:5000/api/admin/visitors?${params.toString()}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch visitors"
        );
    }

    return data;
};