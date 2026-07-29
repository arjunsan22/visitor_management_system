
// import bcrypt from "bcrypt";
// import pool from "../src/config/db.js";

// const seedAdmin = async () => {
//     try {
//         const [rows] = await pool.execute(
//             "SELECT * FROM admin WHERE email = ?",
//             ["admin@gmail.com"]
//         );

//         if (rows.length > 0) {
//             console.log("Admin already exists");
//             process.exit(0);
//         }

//         const hashedPassword = await bcrypt.hash("arjun@1234", 12);

//         // iam inserting a admin
//         await pool.execute(
//             `INSERT INTO admin
//             (name, email, phone, password, role)
//             VALUES (?, ?, ?, ?, ?)`,
//             [
//             "Arjun",
//                 "admin@gmail.com",
//                 "9876543210",
//                 hashedPassword,
//                 "admin"
//             ]
//         );

//         console.log("Admin created successfully");

//         //security
//  const securityEmail = "security@gmail.com";

//     const [securityRows] = await pool.execute(
//       "SELECT * FROM admin WHERE email = ?",
//       [securityEmail]
//     );

//     if (securityRows.length === 0) {
//       const hashedPassword = await bcrypt.hash("security1234", 10);

//       await pool.execute(
//         `INSERT INTO admin
//         (name,email,phone,password,role)
//         VALUES(?,?,?,?,?)`,
//         [
//           "Security",
//           securityEmail,
//           "9876500000",
//           hashedPassword,
//           "security",
//         ]
//       );

//       console.log("✅ Security created successfully");
//     } else {
//       console.log("ℹ️ Security already exists");
//     }


//         process.exit(0);

//     } catch (error) {

//         console.log(error.message);

//         process.exit(1);

//     }
// };

// seedAdmin();

import bcrypt from "bcrypt";
import pool from "../src/config/db.js";

const seedAdmin = async () => {
    try {
        const [adminRows] = await pool.execute(
            "SELECT * FROM admin WHERE email = ?",
            ["admin@gmail.com"]
        );

        if (adminRows.length > 0) {
            console.log("ℹ️ Admin already exists");
        } else {
            const hashedAdminPassword = await bcrypt.hash("arjun@1234", 12);
            await pool.execute(
                `INSERT INTO admin (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
                ["Arjun", "admin@gmail.com", "9876543210", hashedAdminPassword, "admin"]
            );
            console.log("✅ Admin created successfully");
        }

        // 2.Security
        const securityEmail = "security@gmail.com";
        const [securityRows] = await pool.execute(
            "SELECT * FROM admin WHERE email = ?",
            [securityEmail]
        );

        if (securityRows.length > 0) {
            console.log("ℹ️ Security already exists");
        } else {
            const hashedSecurityPassword = await bcrypt.hash("security1234", 12); 
            await pool.execute(
                `INSERT INTO admin (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
                ["Security", securityEmail, "9876500000", hashedSecurityPassword, "security"]
            );
            console.log("✅ Security created successfully");
        }

    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
    } finally {
        await pool.end(); 
        process.exit(0);
    }
};

seedAdmin();
