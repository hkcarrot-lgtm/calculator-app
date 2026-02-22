# 计算器 & 起名

本仓库包含两个独立页面：

| 页面 | 路径 | 说明 |
|------|------|------|
| 计算器 | `index.html` | 加减乘除、取余，支持键盘 |
| 起名 | `naming/index.html` | 按姓氏、性别、生辰与多轮对话生成名字备选，传统文化风格 |

## 本地运行

**计算器**：在项目根目录用浏览器打开 `index.html`，或执行：

```bash
open index.html
```

**起名**：打开 `naming/index.html`，或执行：

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
