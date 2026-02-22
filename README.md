# 计算器

一个简洁的网页计算器，支持加减乘除、取余与键盘操作。

## 本地运行

用浏览器直接打开 `index.html`，或在项目目录执行：

```bash
open index.html
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
