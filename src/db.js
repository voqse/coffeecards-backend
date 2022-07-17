import mongoose from 'mongoose'

export async function connectDB(uri) {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export async function disconnectDB() {
  return await mongoose.connection.close()
}

export async function clearDB() {
  await User.deleteMany({})
  await Token.deleteMany({})
}

export async function saveUser(user) {
  const newUser = new User(user)
  return await newUser.save()
}

export async function getUserById(id) {
  return User.findById(id)
}

export async function getUserByEmail(email) {
  return User.findOne({ email })
}

export async function saveToken({ id }, token) {
  const newToken = new Token({ userId: id, token })
  return await newToken.save()
}

export async function getToken(token) {
  return Token.findOne({ token })
}

export async function deleteToken(token) {
  await Token.deleteOne({ token })
}
