#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { spawn } from 'child_process'
import ora from 'ora'
import gradient from 'gradient-string'
import figlet from 'figlet'
import boxen from 'boxen'

// 获取当前目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 欢迎界面
const showWelcome = () => {
  console.clear()
  console.log(
    boxen(
      gradient.rainbow(
        figlet.textSync('Embrace CLI', { horizontalLayout: 'full' })
      ),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    )
  )
}

// 配置program
program
  .name('embrace')
  .description(chalk.hex('#FFA500')('一个现代化的命令行工具，提供高效便捷的开发体验 ✨'))
  .version('1.0.0', '-v, --version', '显示版本信息')
  .helpOption('-h, --help', '显示帮助信息')

// 初始化命令
program
  .command('init')
  .description('初始化一个新项目 🚀')
  .action(async () => {
    showWelcome()
    
    try {
      console.log(chalk.hex('#FFD700')('\n🌟 让我们开始创建您的项目!'))
      
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: chalk.hex('#00FFFF')('项目名称:'),
          default: 'my-project',
          validate: input => input.trim() !== '' || chalk.red('⚠️ 项目名称不能为空')
        },
        {
          type: 'list',
          name: 'techStack',
          message: chalk.hex('#00FFFF')('请选择技术栈类型:'),
          choices: [
            { name: 'Node.js', value: 'Node' },
            { name: 'React', value: 'React' },
            { name: 'Vue.js', value: 'Vue' },
            { name: 'SSR (Next/Nuxt)', value: 'SSR' }
          ]
        }
      ])

      try {
        switch (answers.techStack) {
          case 'Node':
            await handleNodeTemplates(answers.projectName)
            break
          case 'React':
            await handleReactTemplates(answers.projectName)
            break
          case 'Vue':
            await handleVueTemplates(answers.projectName)
            break
          case 'SSR':
            await handleSSRTemplates(answers.projectName)
            break
          default:
            throw new Error('未知的技术栈类型')
        }

        console.log(
          boxen(
            chalk.hex('#00FF00')(`
🎉 项目 ${chalk.bold(answers.projectName)} 初始化成功!

接下来您可以:
1. ${chalk.hex('#00FFFF')(`cd ${answers.projectName}`)}
2. ${chalk.hex('#00FFFF')('npm install')}
3. ${chalk.hex('#00FFFF')('npm start')}

祝您编码愉快! 🚀
            `),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'green'
            }
          )
        )
      } catch (error) {
        console.error(chalk.red(`\n❌ 创建失败: ${error.message}`))
        process.exit(1)
      }
    } catch (error) {
      console.error(chalk.red(`\n❌ 发生错误: ${error.message}`))
      process.exit(1)
    }
  })

// 公共模板处理函数
const handleTemplateSelection = async (type, templates) => {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: chalk.hex('#00FFFF')(`请选择${type}模板:`),
    choices: Object.entries(templates).map(([key, value]) => ({
      name: value.displayName,
      value: key
    }))
  })
  return templates[template].path
}

// Node模板处理
async function handleNodeTemplates(projectName) {
  const templates = {
    'express-js': {
      displayName: 'Express (JavaScript)',
      path: 'node/express/express-js-template'
    },
    'express-ts': {
      displayName: 'Express (TypeScript)',
      path: 'node/express/express-ts-template'
    },
    'koa-js': {
      displayName: 'Koa (JavaScript)',
      path: 'node/koa/koa-js-template'
    },
    'koa-ts': {
      displayName: 'Koa (TypeScript)',
      path: 'node/koa/koa-ts-template'
    },
    'nest-mongo': {
      displayName: 'NestJS (MongoDB)',
      path: 'node/nest/nest-mongo'
    },
    'nest-mysql': {
      displayName: 'NestJS (MySQL)',
      path: 'node/nest/nest-mysql'
    },
    'nest-prisma': {
      displayName: 'NestJS (Prisma)',
      path: 'node/nest/nest-prisma'
    }
  }

  const templatePath = await handleTemplateSelection('Node框架', templates)
  const spinner = ora({
    text: chalk.hex('#FFA500')(`正在创建 ${projectName} 项目...`),
    spinner: 'dots'
  }).start()

  try {
    await copyTemplate(templatePath, projectName, spinner)
    spinner.succeed(chalk.green(`项目 ${chalk.bold(projectName)} 创建成功! 🎉`))
  } catch (error) {
    spinner.fail(chalk.red(`项目创建失败: ${error.message}`))
    throw error
  }
}

// Vue模板处理
async function handleVueTemplates(projectName) {
  const templates = {
    'vue-js': {
      displayName: 'Vue 3 (JavaScript)',
      path: 'vue/vue-js-template'
    },
    'vue-ts': {
      displayName: 'Vue 3 (TypeScript)',
      path: 'vue/vue-ts-template'
    }
  }

  const templatePath = await handleTemplateSelection('Vue', templates)
  const spinner = ora({
    text: chalk.hex('#FFA500')(`正在创建 ${projectName} 项目...`),
    spinner: 'dots'
  }).start()

  try {
    await copyTemplate(templatePath, projectName, spinner)
    spinner.succeed(chalk.green(`项目 ${chalk.bold(projectName)} 创建成功! 🎉`))
  } catch (error) {
    spinner.fail(chalk.red(`项目创建失败: ${error.message}`))
    throw error
  }
}

// React模板处理
async function handleReactTemplates(projectName) {
  const templates = {
    'react-js': {
      displayName: 'React (JavaScript)',
      path: 'react/react-js-template'
    },
    'react-ts': {
      displayName: 'React (TypeScript)',
      path: 'react/react-ts-template'
    }
  }

  const templatePath = await handleTemplateSelection('React', templates)
  const spinner = ora({
    text: chalk.hex('#FFA500')(`正在创建 ${projectName} 项目...`),
    spinner: 'dots'
  }).start()

  try {
    await copyTemplate(templatePath, projectName, spinner)
    spinner.succeed(chalk.green(`项目 ${chalk.bold(projectName)} 创建成功! 🎉`))
  } catch (error) {
    spinner.fail(chalk.red(`项目创建失败: ${error.message}`))
    throw error
  }
}

// SSR模板处理
async function handleSSRTemplates(projectName) {
  const templates = {
    'next': {
      displayName: 'Next.js',
      path: 'ssr/next'
    },
    'nuxt': {
      displayName: 'Nuxt.js',
      path: 'ssr/nuxt'
    }
  }

  const templatePath = await handleTemplateSelection('SSR框架', templates)
  const spinner = ora({
    text: chalk.hex('#FFA500')(`正在创建 ${projectName} 项目...`),
    spinner: 'dots'
  }).start()

  try {
    await copyTemplate(templatePath, projectName, spinner)
    spinner.succeed(chalk.green(`项目 ${chalk.bold(projectName)} 创建成功! 🎉`))
  } catch (error) {
    spinner.fail(chalk.red(`项目创建失败: ${error.message}`))
    throw error
  }
}

// 增强版模板复制函数
async function copyTemplate(relativeTemplatePath, projectName, spinner) {
  const templatePath = path.join(__dirname, '../templates', relativeTemplatePath)
  const targetPath = path.join(process.cwd(), projectName)

  if (!await fs.pathExists(templatePath)) {
    throw new Error(`模板路径不存在: ${templatePath}`)
  }

  if (await fs.pathExists(targetPath)) {
    const { overwrite } = await inquirer.prompt({
      type: 'confirm',
      name: 'overwrite',
      message: chalk.yellow(`目录 ${projectName} 已存在，是否覆盖？`),
      default: false
    })

    if (!overwrite) {
      throw new Error('操作已取消')
    }

    spinner.text = chalk.hex('#FFA500')('正在清理旧目录...')
    await fs.remove(targetPath)
  }

  try {
    spinner.text = chalk.hex('#FFA500')('正在复制项目文件...')
    await fs.copy(templatePath, targetPath)

    const pkgPath = path.join(targetPath, 'package.json')
    if (await fs.pathExists(pkgPath)) {
      spinner.text = chalk.hex('#FFA500')('正在配置项目...')
      const pkg = await fs.readJson(pkgPath)
      pkg.name = projectName
      await fs.writeJson(pkgPath, pkg, { spaces: 2 })
    }
  } catch (error) {
    throw new Error(`文件操作失败: ${error.message}`)
  }
}

// 启动程序
program.parse(process.argv)

// 无参数时显示帮助信息
if (process.argv.length < 3) {
  showWelcome()
  program.help()
}