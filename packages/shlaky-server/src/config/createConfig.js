const createConfig = () => ({
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/shlaky-server',
  jwtSecret: process.env.JWT_SECRET || 'shlakyDeepSecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '100d',
})

export default createConfig
