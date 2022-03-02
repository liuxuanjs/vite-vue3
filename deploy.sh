#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:liuxuanjs/vite-vue3.git master:gh-pages
git push -f git@47.94.207.42:/home/website/vite-vue3.git master

cd -
