import jwt from 'jsonwebtoken'
import { mockUsers } from './mockData.js'

export function getAuthHeaders(options) {
  // TODO: That options also need to be simplified
  // Definition of default values with what access will be granted
  const {
    payload = {
      email: 'validuser@voqse.com',
      username: 'validuser',
      name: 'Valid User',
    },
    secret = process.env.JWT_SECRET,
    issuer = process.env.JWT_ISSUER,
    expiresIn = process.env.ACCESS_TOKEN_TTL,
    subject = mockUsers[0]._id, // this should be changed to correct ObjectId
  } = options || {}

  const token = jwt.sign(payload, secret, {
    issuer,
    expiresIn,
    subject,
  })

  return {
    Authorization: `Bearer ${token}`,
  }
}
