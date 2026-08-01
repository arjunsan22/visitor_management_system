import pool from "../config/db.js";
import paginate from "../utils/pagination.js";

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
/////////////////////////////////
export const findByPassToken = async (pass_token) => {

    const [rows] = await pool.execute(
        `
        SELECT
            visitors.*,
            admin.name AS verified_by_name
        FROM visitors
        LEFT JOIN admin
            ON visitors.verified_by = admin.id
        WHERE visitors.pass_token = ?
        `,
        [pass_token]
    );

    return rows[0];

};
///////////////////////////////////////////////////////////////
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

///filtering , limit, sorting, pagination ///////

export const getVisitors = async ({
    page,
    limit,
    search,
    department,
    status,
    visit_date,
}) => {

    const offset = (page - 1) * limit;

    let query = `
        SELECT *
        FROM visitors
        WHERE 1=1
    `;

    const values = [];

if (search) {
    query += `
        AND (
            name LIKE ?
            OR phone LIKE ?
            OR purpose LIKE ?
        )
    `;

   
    values.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
    );

  }

  if (department) {
    query += ` AND department = ? `;
    values.push(department);
}

if (status) {
    query += ` AND status = ? `;
    values.push(status);
}

if (visit_date) {
    query += ` AND visit_date = ? `;
    values.push(visit_date);

  }

  query += `
    ORDER BY created_at DESC
    LIMIT ?
    OFFSET ?
`;

values.push(
    Number(limit),
    Number(offset)
);

const [rows] = await pool.execute(
    query,
    values
);

let countQuery = `
    SELECT COUNT(*) AS total
    FROM visitors
    WHERE 1=1
`;

const countValues = [];

if (search) {
    countQuery += `
        AND (
            name LIKE ?
            OR phone LIKE ?
            OR purpose LIKE ?
        )
    `;

    countValues.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
    );
}

if (department) {
    countQuery += ` AND department = ? `;
    countValues.push(department);
}

if (status) {
    countQuery += ` AND status = ? `;
    countValues.push(status);
}

if (visit_date) {
    countQuery += ` AND visit_date = ? `;
    countValues.push(visit_date);
}

const [countRows] = await pool.execute(
    countQuery,
    countValues
);

return paginate({
    data: rows,
    total: countRows[0].total,
    page,
    limit,
});
};
