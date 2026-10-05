
export const createVisitor = async (visitorData) => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/visitors`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(visitorData),
        }
    );

    const data = await response.json();

    
    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create visitor"
        );
    }

    return data;
};


export const getVisitorPass = async (token) => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/visitors/pass/${token}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch visitor pass"
        );
    }

    return data;
};


export const verifyVisitor = async (token) => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/visitors/${token}/verify`,
        {
            method: "PATCH",
            credentials: "include",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to verify visitor"
        );
    }

    return data;
};


export const checkoutVisitor = async (token, check_out_at) => {

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/visitors/${token}/checkout`,
        {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                check_out_at,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to checkout visitor"
        );
    }

    return data;
};