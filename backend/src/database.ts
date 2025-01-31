import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let connectionString: string;

// Check the environment and set the connection string accordingly
if (process.env.NODE_ENV === "production") {
  // Ensure POSTGRES_URL is defined in production
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined in .env file");
  }
  // Set connection string for production database with SSL mode
  connectionString = process.env.POSTGRES_URL + "?sslmode=require";
  // console.log(`Connected to production database: ${process.env.POSTGRES_URL}`);
} else {
  // Set connection string for local development database
  connectionString = "postgres://postgres:farex@localhost/realtimechat";
  // console.log("Connected to local database");
}

// Initialize Sequelize with the correct connection string
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

// Export the sequelize instance for use in other parts of the application
export default sequelize;
