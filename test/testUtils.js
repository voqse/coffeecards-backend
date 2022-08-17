import jwt from 'jsonwebtoken'

function issueToken(options = {}) {
  const {
    secret = process.env.JWT_SECRET,
    issuer = process.env.JWT_ISS,
    expiresIn = process.env.ACCESS_TOKEN_TTL,
  } = options

  const payload = {
    email: 'validuser@voqse.com',
    username: 'validuser',
    name: 'Valid User',
  }

  return jwt.sign(payload, secret, {
    issuer,
    expiresIn,
    subject: 'validuser_id',
  })
}

export function access(fastify, options = {}) {
  const {
    secret,
    issuer,
    expiresIn,
    headers = {
      Authorization: `Bearer ${issueToken({ secret, issuer, expiresIn })}`,
    },
  } = options

  return fastify.inject({
    method: 'GET',
    url: '/cards',
    headers,
  })
}
