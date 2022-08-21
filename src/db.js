import mongoose from 'mongoose'

export function connectDB(uri) {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export function disconnectDB() {
  return mongoose.connection.close()
}
