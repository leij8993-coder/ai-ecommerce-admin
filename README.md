# LUMIÈRE 电商平台

AI Vibecoding 全栈电商项目 — 前台商城 + 后台管理系统

## 在线体验

- **前台商城**：[https://leij8993-coder.github.io/ai-ecommerce-admin/](https://leij8993-coder.github.io/ai-ecommerce-admin/)
- **后台管理**：[https://leij8993-coder.github.io/ai-ecommerce-admin/admin.html](https://leij8993-coder.github.io/ai-ecommerce-admin/admin.html)

## 功能概览

### 前台商城
- SPA 单页应用，首页 / 分类 / 商品详情 / 购物车 / 个人中心
- 50 款商品，5 大品类（数码科技 / 时尚穿搭 / 家居生活 / 美妆护肤 / 美食甄选）
- Banner 轮播、搜索、购物车结算

### 后台管理
- 数据看板（销售额、订单、客户、转化率 + 图表）
- 商品管理（增删改查、分类筛选、AI 生成描述）
- 订单管理（状态筛选）
- 客户管理（增删改查）
- Banner 管理
- AI 助手（商品描述生成 / 智能定价 / 评价分析）

### Node.js 后端（可选）
- 数据持久化到本地 JSON 文件，清缓存不丢失
- 不启动后端也可正常运行（自动 fallback 到内置数据）

## 本地运行

### 纯静态（无需任何安装）
双击 `index.html` 即可打开前台，双击 `admin.html` 即可打开后台。

### 启动后端服务
```bash
node server.js
```
- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin.html

## 技术栈

- 前端：HTML / CSS / JavaScript（纯原生，零框架）
- 后端：Node.js（极简服务，仅依赖内置模块）
- 数据：本地 JSON 文件 + localStorage 双层存储
- AI：支持 Claude / GLM API（手动配置密钥，不硬编码）
