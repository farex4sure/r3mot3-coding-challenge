import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variablee
dotenv.config();

let connectionString: string;

if (process.env.NODE_ENV === "production") {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL is not defined in .env file");
  }
  connectionString = process.env.POSTGRES_URL + "?sslmode=require";
  console.log(`Connected to production database: ${process.env.POSTGRES_URL}`);
} else {
  connectionString = "postgres://postgres:farex@localhost/realtimechat";
  console.log("Connected to local database");
}

// Initialize Sequelize with the correct connection string
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
