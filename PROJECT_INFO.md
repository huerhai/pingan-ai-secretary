# AI超级秘书 - React演示原型

## 项目说明

这是平安健康险AI超级秘书的需求评审演示原型，包含完整的前后端代码。

## 快速启动

### 1. 安装依赖

```bash
# 安装前端依赖
cd client
npm install

# 安装后端依赖
cd ../server
npm init -y
npm install express cors
```

### 2. 启动项目

```bash
# 启动后端（终端1）
cd server
node index.js

# 启动前端（终端2）
cd client
npm start
```

## 页面功能

| 页面 | 功能 |
|------|------|
| 首页 | 关键指标 + 四大模块入口 |
| 技能市场 | 技能展示、分类筛选、搜索、下载 |
| 优秀案例 | 各部门AI应用案例展示 |
| 数据看板 | 安装覆盖率、部门统计 |
| 使用帮助 | 安装教程、FAQ |
| 个人中心 | Token额度明细、申请算力 |
| 管理后台 | 审核技能、用户管理、算力管理 |

## 测试账号

- 普通用户: 任意输入
- 管理员: admin / 任意密码
- 超级管理员: superadmin / 任意密码

## 技术栈

- 前端: React 18
- 后端: Node.js + Express
