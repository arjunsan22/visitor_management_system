import { authFetch } from "../apiClient";

export const getDashboardStats = async () => {
    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/dashboard`,
        {
            method: "GET",
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
} = {}) => {
    const params = new URLSearchParams({
        page,
        limit,
        search,
        department,
        status,
        visit_date,
    });

    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/visitors?${params.toString()}`,
        {
            method: "GET",
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

////\\\\ Security Management API ////\\\\

export const getAllSecurity = async () => {
    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/security`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch security list"
        );
    }

    return data;
};

export const createSecurity = async ({
    name,
    email,
    phone,
    password,
}) => {
    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/security`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create security"
        );
    }

    return data;
};

export const updateSecurity = async (id, {
    name,
    email,
    phone,
}) => {
    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/security/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update security"
        );
    }

    return data;
};

export const deleteSecurity = async (id) => {
    const response = await authFetch(
        `${import.meta.env.VITE_API_URL}/api/admin/security/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete security"
        );
    }

    return data;
};