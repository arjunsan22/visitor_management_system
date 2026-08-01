
import pool from '../config/db.js'

export const findByEmail = async (email) => {
    const [rows] = await pool.execute(
        `SELECT * FROM admin WHERE email = ?`,
        [email]
    );
    return rows[0];
}

export const findById = async (id) => {
    const [rows] = await pool.execute(
        `SELECT * FROM admin WHERE id = ?`,
        [id]
    ); 
    return rows[0];
}

export const createAdmin = async({

    name,
    email,
    phone,
    password,
    role,
})=>{
    const [result] =await pool.execute(
        `INSERT INTO admin
    (name,email,phone,password,role)
    VALUES(?,?,?,?,?)`,
    [name,email,phone,password,role]
    );
    return result.insertId;

};

/////\\\\\ Dashboard //////\\\\\\
export const getDashboardStats = async () => {

    const [rows] = await pool.execute(`
        SELECT
            COUNT(*) AS totalVisitors,

            SUM(CASE
                WHEN status = 'Pending'
                THEN 1
                ELSE 0
            END) AS pendingVisitors,

            SUM(CASE
                WHEN status = 'Verified'
                THEN 1
                ELSE 0
            END) AS verifiedVisitors,

            SUM(CASE
                WHEN status = 'Checked Out'
                THEN 1
                ELSE 0
            END) AS checkedOutVisitors

        FROM visitors
    `);

    return rows[0];
};


///\\\\ security ////\\\\

export const findSecurityByEmail = async (email) => {

    const [rows] = await pool.execute(
        `
        SELECT *
        FROM admin
        WHERE email = ?
        AND role = 'security'
        `,
        [email]
    );

    return rows[0];
};


export const createSecurity = async ({
    name,
    email,
    phone,
    password,
}) => {

    const [result] = await pool.execute(
        `
        INSERT INTO admin
        (
            name,
            email,
            phone,
            password,
            role
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            name,
            email,
            phone,
            password,
            "security",
        ]
    );

    return result.insertId;
};


export const getAllSecurity = async () => {

const [rows] = await pool.execute(
        `
        SELECT
            id,
            name,
            email,
            phone,
            created_at
        FROM admin
        WHERE role = 'security'
        ORDER BY created_at DESC
        `
    );

    return rows;
};