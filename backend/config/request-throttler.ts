import { ThrottleConfig } from '@ioc:Adonis/Addons/RequestThrottler'

export default {
  maxAttempts: 5,

  maxAttemptPeriod: 1000,

  ttlUnits: 'ms',

  cacheStorage: 'in-memory',

  useOwnCache: true,

  limitExceptionParams: {
    code: 'E_LIMIT_EXCEPTION',
    message: 'Too many requests! Please try again later.',
    status: 429,
  },

  requestKeysForRecognizing: ['method', 'hostname', 'url', 'ip'],
} as ThrottleConfig
