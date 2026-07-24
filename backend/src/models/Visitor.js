import pool from "../config/db.js";

export const createVisitor = async ({
    name,
    email,
    phone,
    purpose,
    person_to_visit,
    department,
    visit_date,
    check_in_time,
    pass_token,
}) => {

    const [result] = await pool.execute(
        `INSERT INTO visitors
        (
            name,
            email,
            phone,
            purpose,
            person_to_visit,
            department,
            visit_date,
            check_in_time,
            pass_token
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            name,
            email,
            phone,
            purpose,
            person_to_visit,
            department,
            visit_date,
            check_in_time,
            pass_token,
        ]
    );

    return result.insertId;
};