import dotenv from "dotenv";
import mongoose from "mongoose";

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Connect to MongoDB and clear database before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  // Clear database once at the start
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.close();
});
