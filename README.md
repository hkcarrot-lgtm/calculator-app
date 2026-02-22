# 计算器 & 起名

本仓库包含两个独立页面：

| 页面 | 路径 | 说明 |
|------|------|------|
| **首页** | `index.html` | 入口页，可选择进入「计算器」或「起名」 |
| 计算器 | `calculator.html` | 加减乘除、取余，支持键盘 |
| 起名 | `naming/index.html` | 按姓氏、性别、生辰与多轮对话生成名字备选，传统文化风格 |

---

## 起名 · 使用 Kimi 大模型（个性化话术与名字）

起名页**不配置也能用**：无 API 时自动用本地话术和本地规则生成名字。

若希望对话和名字解读更个性化，可接入 **Kimi 大模型**。Key 只放在**服务端环境变量**里，不写进代码、不暴露给前端。

### 如何部署到 Vercel（一步步来）

**前提**：代码已经推送到 GitHub（例如仓库 `hkcarrot-lgtm/calculator-app`）。

#### 第一步：用 GitHub 登录 Vercel

1. 浏览器打开 **[vercel.com](https://vercel.com)**。
2. 点右上角 **Sign Up** 或 **Log In**，选 **Continue with GitHub**，按提示授权。
3. 登录后会进入 Vercel 的 Dashboard。

#### 第二步：从 GitHub 导入项目

1. 在 Dashboard 点 **Add New…**（或 **Create**）→ **Project**。
2. 在列表里找到 **calculator-app**（或你的仓库名），点右侧 **Import**。
3. **Configure Project** 页面一般不用改：
   - **Project Name** 可保持 `calculator-app`；
   - **Framework Preset** 选 **Other** 或保持默认；
   - **Root Directory** 留空；
   - 不要勾选 “Override” 除非你知道要改。
4. 直接点 **Deploy**，等几十秒到一两分钟。

#### 第三步：记下访问地址

1. 部署成功后会出现 **Congratulations** 页面。
2. 点 **Visit** 或记下给你的域名，形如：**https://calculator-app-xxxx.vercel.app**。
3. 起名页的完整地址就是：**https://calculator-app-xxxx.vercel.app/naming/**。

#### 第四步：配置 Kimi API Key（才能用个性化对话和名字）

1. 在 Vercel 里打开你这个项目（点项目名或从 Dashboard 进）。
2. 顶部点 **Settings**，左侧点 **Environment Variables**。
3. 在 **Key** 里填：`KIMI_API_KEY`  
   在 **Value** 里粘贴你生成好的 Kimi API Key（只填一次，不会显示在页面上）。
4. **Environment** 勾选 **Production**（想预览环境也用就再勾 **Preview**），点 **Save**。
5. 到 **Deployments** 页，对**最新一次**部署右侧点 **⋯** → **Redeploy**，等部署完成。

完成后，用 **https://你的项目名.vercel.app/naming/** 打开起名页，对话和名字会走 Kimi；用 GitHub Pages 或本地打开则仍是本地逻辑。

**可选环境变量**（不填则用默认）：  
- `KIMI_API_BASE`：接口地址，默认 `https://api.moonshot.cn/v1`（K2 等可改为对应 base）。  
- `KIMI_MODEL`：模型名，默认 `moonshot-v1-32k`。

**请勿**把 API Key 发给我或写进代码、提交到仓库；只在 Vercel 的 Environment Variables 里粘贴即可。

---

## 本地运行

**首页**：打开 `index.html`，可选择「计算器」或「起名」。

**计算器**：打开 `calculator.html`，或从首页点击「计算器」。

**起名**：打开 `naming/index.html`，或从首页点击「起名」，或执行：

```bash
open naming/index.html
```

## 部署到 GitHub Pages

### 1. 在 GitHub 上新建仓库

1. 打开 [github.com/new](https://github.com/new)
2. **Repository name** 填：`calculator-app`（或任意名称）
3. 选择 **Public**，不要勾选 “Add a README”
4. 点击 **Create repository**

### 2. 推送本地代码

在终端执行（把 `你的用户名` 换成你的 GitHub 用户名）：

```bash
cd /Users/mogu/我的cursor编程/calculator-app

git remote add origin https://github.com/你的用户名/calculator-app.git
git branch -M main
git push -u origin main
```

若提示登录，按提示用浏览器或 Personal Access Token 完成认证。

### 3. 开启 GitHub Pages

1. 打开该仓库页面，点击 **Settings**
2. 左侧选择 **Pages**
3. 在 **Build and deployment** 里：
   - **Source** 选 **Deploy from a branch**
   - **Branch** 选 **main**，文件夹选 **/ (root)**
4. 点击 **Save**

### 4. 访问网站

等 1～2 分钟后，在浏览器打开：

**https://你的用户名.github.io/calculator-app/**

即可看到已部署的计算器。（若仓库名改了，把链接里的 `calculator-app` 换成你的仓库名即可。）

---

## 使用自己买的域名（自定义域名）

买好域名后，让新域名直接打开这个计算器（访问新域名 = 打开计算器，无需跳转）。

### 1. 哪里买域名

- **国内**：阿里云（万网）、腾讯云 DNSPod、华为云 等
- **国外**：Namecheap、Cloudflare、Google Domains、GoDaddy 等

买一个你喜欢的域名（例如 `mycalc.com`、`jisuanqi.cn` 等），并拿到「DNS 管理」权限。

### 2. 在 GitHub 里填自定义域名

1. 打开仓库：**https://github.com/hkcarrot-lgtm/calculator-app**
2. **Settings** → 左侧 **Pages**
3. 在 **Custom domain** 里填你买的域名：
   - 用 **www**：填 `www.你的域名.com`（推荐，配置简单）
   - 用 **根域名**：填 `你的域名.com`
4. 点 **Save**
5. 勾选 **Enforce HTTPS**（用 HTTPS 打开）

### 3. 在域名服务商里配置 DNS

登录你买域名的平台，找到「DNS 解析 / DNS 管理 / 解析设置」。

**方式 A：用 www（推荐）**

- 类型：**CNAME**
- 主机记录 / 名称：**www**（或 `www.你的域名.com` 里的主机名）
- 记录值 / 目标：**hkcarrot-lgtm.github.io**
- 保存

**方式 B：用根域名（如 example.com）**

- 类型：**A**
- 主机记录：**@**（表示根域名）
- 记录值填下面 4 个 IP（每条各填一个）：
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- 保存

若还想用 www，再加一条 **CNAME**：主机 **www** → **hkcarrot-lgtm.github.io**。

### 4. 生效时间

DNS 一般 5 分钟～几小时生效。生效后：

- 用 **www**：打开 **https://www.你的域名.com** = 直接打开计算器  
- 用 **根域名**：打开 **https://你的域名.com** = 直接打开计算器  

无需「点击再跳转」，新域名就是计算器的地址。

### 若你只想「新域名点击后跳转到 GitHub 地址」

不想用自定义域名展示站点，只想「访问新域名 → 自动跳到 hkcarrot-lgtm.github.io/calculator-app」：

- 在域名服务商处使用「URL 转发 / 重定向」：把新域名转发到  
  `https://hkcarrot-lgtm.github.io/calculator-app/`  
  具体在购买域名的控制台里找「转发」「重定向」「Redirect」等设置即可。
