import jwt from 'jsonwebtoken'

function issueToken(options = {}) {
  const {
    payload = {
      email: 'validuser@voqse.com',
      username: 'validuser',
      name: 'Valid User',
    },
    secret = process.env.JWT_SECRET,
    issuer = process.env.JWT_ISS,
    expiresIn = process.env.ACCESS_TOKEN_TTL,
    subject = 'validuser_id',
  } = options

  return jwt.sign(payload, secret, {
    issuer,
    expiresIn,
    subject,
  })
}

export function access(fastify, options = {}) {
  let { headers, ...jwtOptions } = options

  if (!headers) {
    headers = {
      Authorization: `Bearer ${issueToken(jwtOptions)}`,
    }
  }

  return fastify.inject({
    method: 'GET',
    url: '/cards',
    headers,
  })
}
