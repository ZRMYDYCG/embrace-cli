#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { spawn } from 'child_process'

// 定义模板路径和配置
const TEMPLATES_DIR = path.join(__dirname, '../templates')
const TEMPLATES = {
  'vue-default': 'Vue 默认模板',
  'vue-admin': 'Vue 后台管理系统模板',
  'vue-mobile': 'Vue 移动端模板'
}

// 设置命令行参数
program
  .option('-n, --name <name>', '项目名称')
  .option('-t, --template <template>', '项目模板')
  .parse(process.argv)

async function main() {
  // 获取或询问项目名称
  let projectName = program.opts().name
  if (!projectName) {
    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: '请输入项目名称:',
      default: 'my-vue-project'
    })
    projectName = name
  }

  // 获取或询问模板选择
  let template = program.opts().template
  if (!template || !TEMPLATES[template]) {
    const { selectedTemplate } = await inquirer.prompt({
      type: 'list',
      name: 'selectedTemplate',
      message: '请选择项目模板:',
      choices: Object.entries(TEMPLATES).map(([value, name]) => ({
        name,
        value
      }))
    })
    template = selectedTemplate
  }

  // 创建项目逻辑
  const projectPath = path.join(process.cwd(), projectName)
  const templatePath = path.join(TEMPLATES_DIR, template)
  
  try {
    await fs.copy(templatePath, projectPath)
    console.log(chalk.green(`项目 ${projectName} 创建成功!`))
    console.log(chalk.blue(`cd ${projectName}`))
    console.log(chalk.blue('npm install'))
  } catch (err) {
    console.error(chalk.red('项目创建失败:', err))
  }
}

main().catch(console.error)