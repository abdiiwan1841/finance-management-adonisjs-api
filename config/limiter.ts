import { limiterConfig } from '@adonisjs/limiter/build/config'

export default limiterConfig({
  default: 'db',
  stores: {
    db: {
      client: 'db',
      dbName: 'finance-manager-adonisjs-api',
      tableName: 'rate_limits',
      connectionName: 'pg',
      clearExpiredByTimeout: true,
    },
  },
})
