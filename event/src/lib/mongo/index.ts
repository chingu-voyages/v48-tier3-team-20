import mongoose from 'mongoose';

declare global {
  var mongoose: any;
}

let uri: string;
if (process.env.MONGODB_URI) {
  uri = process.env.MONGODB_URI

  console.log(uri)

} else {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    })
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }  
  return cached.conn;
}

export default dbConnect;