import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 15000,
        maxPoolSize: 10,
      })
      .then((m) => {
        const { host, name } = m.connection;
        console.log(`MongoDB connected (${name} @ ${host})`);
        return m;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
