import developmentConfig from './development.js'
import productionConfig from './production.js'
import defaultConfig from './default.js'

const env = process.env.NODE_ENV || 'development'

const configMap = {
  development: developmentConfig,
  production: productionConfig,
}

export function loadConfig() {
  return {
    ...defaultConfig,
    ...configMap[env],
  }
}
