import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 验证构建输出有效性
// 属性 4: 构建输出有效性
// 验证: 需求 7.1, 7.5

console.log('🔍 验证构建输出...\n');

const distDir = path.join(rootDir, 'docs/.vitepress/dist');

// 检查输出目录是否存在
if (!fs.existsSync(distDir)) {
  console.log('❌ 构建输出目录不存在');
  console.log('   请先运行: npm run docs:build');
  process.exit(1);
}

let allPassed = true;

// 检查 HTML 文件
console.log('📄 检查 HTML 文件:');
const htmlFiles = [
  'index.html',
  'basics/index.html',
  'advanced/index.html',
  'interview/index.html',
  'algorithms/index.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(distDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allPassed = false;
});

// 检查资源目录
console.log('\n📁 检查资源目录:');
const assetsDir = path.join(distDir, 'assets');
const hasAssets = fs.existsSync(assetsDir);
console.log(`  ${hasAssets ? '✅' : '❌'} assets 目录存在`);
if (!hasAssets) {
  allPassed = false;
} else {
  // 检查 CSS 和 JS 文件
  const files = fs.readdirSync(assetsDir);
  const cssFiles = files.filter(f => f.endsWith('.css'));
  const jsFiles = files.filter(f => f.endsWith('.js'));
  
  console.log(`  ✅ CSS 文件: ${cssFiles.length} 个`);
  console.log(`  ✅ JS 文件: ${jsFiles.length} 个`);
  
  if (cssFiles.length === 0 || jsFiles.length === 0) {
    allPassed = false;
  }
}

// 检查文件大小（确保已压缩）
console.log('\n📊 检查文件优化:');
if (hasAssets) {
  const files = fs.readdirSync(assetsDir);
  let totalSize = 0;
  
  files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  });
  
  const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
  console.log(`  📦 总资源大小: ${totalSizeMB} MB`);
  
  // 检查是否有未压缩的大文件
  files.forEach(file => {
    const filePath = path.join(assetsDir, file);
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    
    if (stats.size > 1024 * 1024) { // 大于 1MB
      console.log(`  ⚠️  ${file}: ${sizeMB} MB (较大)`);
    }
  });
}

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ 所有验证通过！构建输出有效。');
  process.exit(0);
} else {
  console.log('❌ 验证失败！请检查上述错误。');
  process.exit(1);
}
