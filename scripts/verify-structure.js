import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 验证项目结构完整性
// 属性 2: 项目结构完整性
// 验证: 需求 1.1, 1.2, 1.3

console.log('🔍 验证项目结构完整性...\n');

const requiredFiles = [
  'package.json',
  'docs/.vitepress/config.ts',
  'docs/index.md',
  'docs/basics/index.md',
  'docs/advanced/index.md',
  'docs/interview/index.md',
  'docs/algorithms/index.md'
];

const requiredDirs = [
  'docs',
  'docs/.vitepress',
  'docs/public',
  'docs/basics',
  'docs/advanced',
  'docs/interview',
  'docs/algorithms'
];

let allPassed = true;

// 检查必需的文件
console.log('📄 检查必需的文件:');
for (const file of requiredFiles) {
  const filePath = path.join(rootDir, file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allPassed = false;
}

console.log('\n📁 检查必需的目录:');
for (const dir of requiredDirs) {
  const dirPath = path.join(rootDir, dir);
  const exists = fs.existsSync(dirPath);
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (!exists) allPassed = false;
}

// 检查 package.json 中的 VitePress 依赖
console.log('\n📦 检查 VitePress 依赖:');
const packageJsonPath = path.join(rootDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const hasVitePress = packageJson.devDependencies && packageJson.devDependencies.vitepress;
console.log(`  ${hasVitePress ? '✅' : '❌'} VitePress 依赖存在`);
if (!hasVitePress) allPassed = false;

// 检查配置文件内容
console.log('\n⚙️  检查配置文件:');
const configPath = path.join(rootDir, 'docs/.vitepress/config.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');
const hasTitle = configContent.includes('title:');
const hasDescription = configContent.includes('description:');
console.log(`  ${hasTitle ? '✅' : '❌'} 配置包含 title`);
console.log(`  ${hasDescription ? '✅' : '❌'} 配置包含 description`);
if (!hasTitle || !hasDescription) allPassed = false;

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ 所有验证通过！项目结构完整。');
  process.exit(0);
} else {
  console.log('❌ 验证失败！请检查上述错误。');
  process.exit(1);
}
