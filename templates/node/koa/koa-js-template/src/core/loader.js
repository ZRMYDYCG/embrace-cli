import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function loadMiddlewares(app) {
  const middlewaresPath = path.join(__dirname, '../middleware');
  const files = fs.readdirSync(middlewaresPath);
  
  for (const file of files) {
    if (file.endsWith('.js')) {
      const middlewareModule = await import(`../middleware/${file}`);
      const middleware = middlewareModule.default || middlewareModule;
      if (typeof middleware === 'function') {
        app.use(middleware);
      } else {
        console.warn(`跳过非函数中间件: ${file}`);
      }
    }
  }
}
