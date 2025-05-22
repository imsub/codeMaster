// orm.config.ts
import { DataSource } from 'typeorm';

const envConfig = {
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/leetcode_db',
  },
};

export const AppDataSource = new DataSource({
  type: 'postgres', // Adjust based on your DB (e.g., 'mysql', 'sqlite')
  url: envConfig.dbCredentials.connectionString,
  entities: ['src/entities/**/*.ts'], // Adjust path to your entities
  migrations: ['src/migrations/**/*.ts'], // Adjust path to your migrations
  synchronize: false, // Set to false in production to avoid accidental schema changes
  logging: true,
});