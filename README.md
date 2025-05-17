# Embrace CLI

一个现代化的命令行工具，提供高效便捷的开发体验。

## 功能特性

- 🚀 快速执行常见开发任务
- 🔧 可扩展的插件系统
- 📦 简洁易用的命令接口
- 🌈 友好的交互式界面

## 安装

### 通过npm安装

```bash
npm install -g embrace-cli
```

### 通过源码安装

1. 克隆仓库：
```bash
git clone https://github.com/your-repo/embrace-cli.git
```

2. 安装依赖：
```bash
cd embrace-cli
npm install
```

3. 全局链接：
```bash
npm link
```

## 快速开始

查看帮助信息：
```bash
embrace --help
```

运行示例命令：
```bash
embrace init
```

## 命令列表

| 命令       | 描述                  | 示例                     |
|------------|----------------------|-------------------------|
| `init`     | 初始化新项目          | `embrace init`  |
| `help`    | 构建项目              | `embrace --help`        |

## 开发指南

### 添加新命令

1. 在`src/commands`目录下创建新文件
2. 实现命令逻辑
3. 在`src/index.js`中注册命令

### 测试

运行单元测试：
```bash
npm test
```

## 贡献

欢迎提交Pull Request或Issue。

## 许可证

MIT © [Your Name]
