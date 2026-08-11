
export const createVisitor = async (visitorData) => {

    const response = await fetch(
        "http://localhost:5000/api/visitors",
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
        `http://localhost:5000/api/visitors/pass/${token}`
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
        `http://localhost:5000/api/visitors/${token}/verify`,
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