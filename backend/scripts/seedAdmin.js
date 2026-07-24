
import bcrypt from "bcrypt";
import pool from "../src/config/db.js";

const seedAdmin = async () => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM admin WHERE email = ?",
            ["admin@gmail.com"]
        );

        if (rows.length > 0) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("arjun@1234", 12);

        // iam inserting a admin
        await pool.execute(
            `INSERT INTO admin
            (name, email, phone, password, role)
            VALUES (?, ?, ?, ?, ?)`,
            [
            "Arjun",
                "admin@gmail.com",
                "9876543210",
                hashedPassword,
                "admin"
            ]
        );

        console.log("Admin created successfully");

        process.exit(0);

    } catch (error) {

        console.log(error.message);

        process.exit(1);

    }
};

seedAdmin();