@echo off
REM Windows 快速部署脚本

echo 🚀 开始部署到 GitHub Pages...

REM 添加所有更改
git add .

REM 提交
set COMMIT_MSG=Update: %date% %time%
git commit -m "%COMMIT_MSG%"

REM 推送到远程仓库
git push

echo ✅ 部署完成！
echo 📝 提交信息: %COMMIT_MSG%
echo 🔗 请在 GitHub Actions 中查看部署进度
pause
