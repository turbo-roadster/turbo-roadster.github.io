import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 验证部署配置正确性
// 属性 5: 部署配置正确性
// 验证: 需求 5.3, 5.4

console.log('🔍 验证部署配置...\n');

let allPassed = true;

// 检查 GitHub Actions 工作流文件
console.log('📄 检查 GitHub Actions 工作流:');
const workflowPath = path.join(rootDir, '.github/workflows/deploy.yml');
const hasWorkflow = fs.existsSync(workflowPath);
console.log(`  ${hasWorkflow ? '✅' : '❌'} deploy.yml 文件存在`);
if (!hasWorkflow) {
  allPassed = false;
} else {
  const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
  
  // 检查关键配置
  const checks = [
    { name: '触发条件 (push)', pattern: /on:\s*\n\s*push:/ },
    { name: 'Node.js 版本', pattern: /node-version:\s*18/ },
    { name: '构建命令', pattern: /npm run docs:build/ },
    { name: '部署步骤', pattern: /deploy-pages/ }
  ];
  
  checks.forEach(check => {
    const passed = check.pattern.test(workflowContent);
    console.log(`  ${passed ? '✅' : '❌'} ${check.name}`);
    if (!passed) allPassed = false;
  });
}

// 检查 VitePress 配置
console.log('\n⚙️  检查 VitePress 配置:');
const configPath = path.join(rootDir, 'docs/.vitepress/config.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');

// 检查 base 路径配置
const hasBase = configContent.includes('base:');
console.log(`  ${hasBase ? '✅' : '❌'} base 路径配置存在`);
if (!hasBase) allPassed = false;

// 检查构建输出目录
const hasBuildConfig = configContent.includes('build:') || configContent.includes('outDir:');
console.log(`  ${hasBuildConfig ? '✅' : '❌'} 构建配置存在`);

// 提取 base 路径值
const baseMatch = configContent.match(/base:\s*['"]([^'"]+)['"]/);
if (baseMatch) {
  const basePath = baseMatch[1];
  console.log(`  ℹ️  当前 base 路径: ${basePath}`);
  
  if (basePath === '/') {
    console.log('  ℹ️  配置为用户/组织站点 (https://<USERNAME>.github.io/)');
  } else {
    console.log(`  ℹ️  配置为项目站点 (https://<USERNAME>.github.io${basePath})`);
  }
}

// 检查输出目录配置
console.log('\n📁 检查输出目录配置:');
const outDirMatch = configContent.match(/outDir:\s*['"]([^'"]+)['"]/);
if (outDirMatch) {
  const outDir = outDirMatch[1];
  console.log(`  ✅ 输出目录: ${outDir}`);
  
  // 验证输出目录路径
  if (outDir.includes('.vitepress/dist')) {
    console.log('  ✅ 输出目录配置正确');
  } else {
    console.log('  ⚠️  输出目录可能不正确，建议使用 .vitepress/dist');
  }
} else {
  console.log('  ℹ️  使用默认输出目录: .vitepress/dist');
}

// 检查部署文档
console.log('\n📚 检查部署文档:');
const deploymentDocPath = path.join(rootDir, 'DEPLOYMENT.md');
const hasDeploymentDoc = fs.existsSync(deploymentDocPath);
console.log(`  ${hasDeploymentDoc ? '✅' : '❌'} DEPLOYMENT.md 文档存在`);

// 检查 .gitignore
console.log('\n🚫 检查 .gitignore:');
const gitignorePath = path.join(rootDir, '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
  const ignoresNodeModules = gitignoreContent.includes('node_modules');
  const ignoresDist = gitignoreContent.includes('dist') || gitignoreContent.includes('.vitepress/dist');
  
  console.log(`  ${ignoresNodeModules ? '✅' : '⚠️ '} 忽略 node_modules`);
  console.log(`  ${ignoresDist ? '✅' : '⚠️ '} 忽略构建输出`);
} else {
  console.log('  ⚠️  .gitignore 文件不存在');
  console.log('  建议创建 .gitignore 文件');
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ 所有验证通过！部署配置正确。');
  console.log('\n📝 下一步:');
  console.log('  1. 将代码推送到 GitHub');
  console.log('  2. 在仓库设置中启用 GitHub Pages (Source: GitHub Actions)');
  console.log('  3. 查看 Actions 标签页确认部署状态');
  console.log('\n详细步骤请参考 DEPLOYMENT.md 文档');
  process.exit(0);
} else {
  console.log('❌ 验证失败！请检查上述错误。');
  process.exit(1);
}
