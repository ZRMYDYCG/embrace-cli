#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { spawn } from 'child_process'

// 主函数
async function main() {
  const { projectName } = await inquirer.prompt({
    type: 'input',
    name: 'projectName',
    message: '项目名称:',
    default: 'my-project',
    validate: input => input.trim() !== '' || '项目名称不能为空'
  })

  const { techStack } = await inquirer.prompt({
    type: 'list',
    name: 'techStack',
    message: '请选择技术栈类型:',
    choices: ['Node', 'React', 'Vue', 'SSR']
  })

  switch (techStack) {
    case 'Node':
      await handleNodeTemplates(projectName)
      break
    case 'React':
      await handleReactTemplates(projectName)
      break
    case 'Vue':
      await handleVueTemplates(projectName)
      break
    case 'SSR':
      await handleSSRTemplates(projectName)
      break
  }
}

// Node模板处理
async function handleNodeTemplates(projectName) {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择Node框架:',
    choices: ['Express(JS)', 'Express(TS)', 'Koa(JS)', 'Koa(TS)', 'Nest(Mongo)', 'Nest(MySQL)', 'Nest(Prisma)']
  })
  
  const templateMap = {
    'Express(JS)': 'node/express/express-js-template',
    'Express(TS)': 'node/express/express-ts-template',
    'Koa(JS)': 'node/koa/koa-js-template',
    'Koa(TS)': 'node/koa/koa-ts-template',
    'Nest(Mongo)': 'node/nest/nest-mongo',
    'Nest(MySQL)': 'node/nest/nest-mysql',
    'Nest(Prisma)': 'node/nest/nest-prisma'
  }
  
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatePath = path.join(dirname, '../templates', templateMap[template])
  await copyTemplate(templatePath, projectName)
}

// Vue模板处理
async function handleVueTemplates(projectName) {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择Vue模板:',
    choices: ['Vue(JS)', 'Vue(TS)']
  })
  
  const templateMap = {
    'Vue(JS)': 'vue/vue-js-template',
    'Vue(TS)': 'vue/vue-ts-template'
  }
  
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatePath = path.join(dirname, '../templates', templateMap[template])
  await copyTemplate(templatePath, projectName)
}

// React模板处理
async function handleReactTemplates(projectName) {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择React模板:',
    choices: ['React(JS)', 'React(TS)']
  })
  
  const templateMap = {
    'React(JS)': 'react/react-js-template',
    'React(TS)': 'react/react-ts-template'
  }
  
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatePath = path.join(dirname, '../templates', templateMap[template])
  await copyTemplate(templatePath, projectName)
}

// SSR模板处理
async function handleSSRTemplates(projectName) {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: '请选择SSR框架:',
    choices: ['Next', 'Nuxt']
  })
  
  const templateMap = {
    'Next': 'ssr/next',
    'Nuxt': 'ssr/nuxt'
  }
  
  const dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatePath = path.join(dirname, '../templates', templateMap[template])
  await copyTemplate(templatePath, projectName)
}

// 模板复制函数
async function copyTemplate(templatePath, projectName) {
  try {
    const targetPath = path.join(process.cwd(), projectName)
    await fs.copy(templatePath, targetPath)
    
    // 检查并更新package.json
    const pkgPath = path.join(targetPath, 'package.json')
    if (await fs.pathExists(pkgPath)) {
      const pkg = await fs.readJson(pkgPath)
      pkg.name = projectName
      await fs.writeJson(pkgPath, pkg, { spaces: 2 })
    }
    
    console.log(chalk.green(`项目 ${chalk.bold(projectName)} 初始化成功!`))
  } catch (err) {
    console.error(chalk.red('项目初始化失败:', err))
  }
}

// 启动程序
main().catch(console.error)