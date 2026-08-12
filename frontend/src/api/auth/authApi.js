
export const login = async (email, password) => {

    const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Login failed"
        );
    }

    return data;
};

////// to get user info from the cookie after login  ///////

export const getCurrentUser = async () => {

    const response = await fetch(
        "http://localhost:5000/api/auth/me",
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();
console.log('current user :',data.data)
    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch current user"
        );
    }

    return data;
};