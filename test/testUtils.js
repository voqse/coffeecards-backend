import jwt from 'jsonwebtoken'

// TODO: Convert into a fastify plugin
function issueToken(options = {}) {
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

  return jwt.sign(payload, secret, {
    issuer,
    expiresIn,
    subject,
  })
}

export function access(fastify, url, options = {}) {
  let { headers, ...jwtOptions } = options

  if (!headers) {
    headers = {
      Authorization: `Bearer ${issueToken(jwtOptions)}`,
    }
  }

  return fastify.inject({
    method: 'GET',
    url,
    headers,
  })
}
