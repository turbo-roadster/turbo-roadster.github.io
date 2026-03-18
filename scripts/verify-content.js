import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 验证内容文件格式
// 属性 1: 所有内容文件使用 Markdown 格式
// 验证: 需求 3.1

console.log('🔍 验证内容文件格式...\n');

const docsDir = path.join(rootDir, 'docs');

// 递归获取所有文件
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 跳过特殊目录
      if (file !== '.vitepress' && file !== 'public' && file !== 'node_modules') {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const allFiles = getAllFiles(docsDir);
let allPassed = true;
let mdCount = 0;
let nonMdCount = 0;
const nonMdFiles = [];

console.log('📄 检查内容文件:');

allFiles.forEach(file => {
  const relativePath = path.relative(docsDir, file);
  const ext = path.extname(file);
  
  // 跳过隐藏文件和特殊文件
  if (relativePath.startsWith('.') || relativePath.includes('/.')) {
    return;
  }
  
  if (ext === '.md') {
    mdCount++;
    console.log(`  ✅ ${relativePath}`);
  } else {
    nonMdCount++;
    nonMdFiles.push(relativePath);
    console.log(`  ⚠️  ${relativePath} (非 Markdown 文件)`);
  }
});

console.log('\n📊 统计信息:');
console.log(`  Markdown 文件: ${mdCount} 个`);
console.log(`  其他文件: ${nonMdCount} 个`);

if (nonMdFiles.length > 0) {
  console.log('\n⚠️  非 Markdown 文件列表:');
  nonMdFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
}

// 检查关键内容文件是否存在
console.log('\n🔑 检查关键内容文件:');
const keyFiles = [
  'index.md',
  'basics/index.md',
  'advanced/index.md',
  'interview/index.md',
  'algorithms/index.md',
  'about.md'
];

keyFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allPassed = false;
});

// 检查是否有示例文章
console.log('\n📝 检查示例文章:');
const exampleFiles = [
  'basics/html/semantic.md',
  'basics/css/flexbox.md',
  'basics/javascript/async.md',
  'advanced/framework/react.md'
];

let exampleCount = 0;
exampleFiles.forEach(file => {
  const filePath = path.join(docsDir, file);
  const exists = fs.existsSync(filePath);
  if (exists) {
    exampleCount++;
    console.log(`  ✅ ${file}`);
  }
});

console.log(`\n  找到 ${exampleCount} 个示例文章`);

console.log('\n' + '='.repeat(50));
if (allPassed && mdCount > 0) {
  console.log('✅ 所有验证通过！内容文件格式正确。');
  console.log(`   共有 ${mdCount} 个 Markdown 文件`);
  process.exit(0);
} else {
  console.log('❌ 验证失败！请检查上述错误。');
  process.exit(1);
}
