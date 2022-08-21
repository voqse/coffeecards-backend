import jwt from 'jsonwebtoken'

// TODO: Convert into a fastify plugin
export function buildHeaders(options = {}) {
  // Definition of default values with what access will be granted
  // TODO: That options also need to be simplified
  const {
    payload = {
      email: 'validuser@voqse.com',
      username: 'validuser',
      name: 'Valid User',
    },
    secret = process.env.JWT_SECRET,
    issuer = process.env.JWT_ISS,
    expiresIn = process.env.ACCESS_TOKEN_TTL,
    subject = 'validuser_id', // this should be changed to correct ObjectId
  } = options

  const token = jwt.sign(payload, secret, {
    issuer,
    expiresIn,
    subject,
  })

  return {
    Authorization: `Bearer ${token}`,
  }
}
