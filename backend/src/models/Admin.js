
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