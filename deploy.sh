#!/bin/bash

# 快速部署脚本

echo "🚀 开始部署到 GitHub Pages..."

# 添加所有更改
git add .

# 提交（使用时间戳作为提交信息）
COMMIT_MSG="Update: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# 推送到远程仓库
git push

echo "✅ 部署完成！"
echo "📝 提交信息: $COMMIT_MSG"
echo "🔗 请在 GitHub Actions 中查看部署进度"
