// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ No MongoDB URI found in environment variables");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache: MongooseCache;
};

globalWithMongoose.mongooseCache ||= {
  conn: null,
  promise: null,
};

async function connectToDatabase(): Promise<typeof mongoose> {
  if (globalWithMongoose.mongooseCache.conn) {
    return globalWithMongoose.mongooseCache.conn;
  }

  if (!globalWithMongoose.mongooseCache.promise) {
    globalWithMongoose.mongooseCache.promise = mongoose.connect(
      MONGODB_URI as string,
      {
        bufferCommands: false,
      }
    );
  }

  globalWithMongoose.mongooseCache.conn = await globalWithMongoose.mongooseCache
    .promise;

  return globalWithMongoose.mongooseCache.conn;
}

export default connectToDatabase;
