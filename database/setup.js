const { pool } = require("../dist/config/db");
const fs = require("fs");
const path = require("path");

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Read the schema file
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Execute the schema
    await pool.query(schema);

    console.log("✅ Database setup completed successfully!");
    console.log("Tables created: users, wallets, messages, calls");

    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();