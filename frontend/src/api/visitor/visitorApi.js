
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