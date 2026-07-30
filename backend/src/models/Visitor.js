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
    ],
  );

  return result.insertId;
};

export const findByPassToken = async (pass_token) => {
  const [rows] = await pool.execute(
    `SELECT * FROM visitors WHERE pass_token = ?`,
    [pass_token],
  );

  return rows[0];

};

export const verifyVisitor = async (pass_token, verified_by) => {

    const [result] = await pool.execute(
        `UPDATE visitors
         SET
            status = ?,
            verified_by = ?,
            verified_at = NOW()
         WHERE pass_token = ?`,
        [
            "Verified",
            verified_by,
            pass_token
        ]
    );
    return result;
};
////////checkout/////////////////////////
export const checkoutVisitor = async ( pass_token,check_out_at ) => {

    const [result] = await pool.execute(
        `UPDATE visitors
        SET
            check_out_at = ?,
            status = 'Checked Out'
        WHERE pass_token = ?`,
        [check_out_at, pass_token]
    );

    return result;
};
