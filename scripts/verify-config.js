import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 验证配置完整性
// 属性 3: 配置完整性
// 验证: 需求 8.1, 8.2, 8.3, 8.4

console.log('🔍 验证配置完整性...\n');

const configPath = path.join(rootDir, 'docs/.vitepress/config.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');

let allPassed = true;

// 检查站点元数据
console.log('📝 检查站点元数据:');
const hasTitle = configContent.includes('title:');
const hasDescription = configContent.includes('description:');
console.log(`  ${hasTitle ? '✅' : '❌'} title 配置存在`);
console.log(`  ${hasDescription ? '✅' : '❌'} description 配置存在`);
if (!hasTitle || !hasDescription) allPassed = false;

// 检查导航配置
console.log('\n🧭 检查导航配置:');
const hasNav = configContent.includes('nav:');
const hasNavItems = configContent.match(/text:\s*['"]首页['"]/);
console.log(`  ${hasNav ? '✅' : '❌'} nav 配置存在`);
console.log(`  ${hasNavItems ? '✅' : '❌'} nav 包含导航项`);
if (!hasNav || !hasNavItems) allPassed = false;

// 检查侧边栏配置
console.log('\n📚 检查侧边栏配置:');
const hasSidebar = configContent.includes('sidebar:');
const hasBasicsSidebar = configContent.includes("'/basics/':");
const hasAdvancedSidebar = configContent.includes("'/advanced/':");
const hasInterviewSidebar = configContent.includes("'/interview/':");
const hasAlgorithmsSidebar = configContent.includes("'/algorithms/':");
console.log(`  ${hasSidebar ? '✅' : '❌'} sidebar 配置存在`);
console.log(`  ${hasBasicsSidebar ? '✅' : '❌'} 基础篇侧边栏配置`);
console.log(`  ${hasAdvancedSidebar ? '✅' : '❌'} 进阶篇侧边栏配置`);
console.log(`  ${hasInterviewSidebar ? '✅' : '❌'} 面试篇侧边栏配置`);
console.log(`  ${hasAlgorithmsSidebar ? '✅' : '❌'} 算法篇侧边栏配置`);
if (!hasSidebar || !hasBasicsSidebar || !hasAdvancedSidebar || !hasInterviewSidebar || !hasAlgorithmsSidebar) {
  allPassed = false;
}

// 检查搜索配置
console.log('\n🔍 检查搜索配置:');
const hasSearch = configContent.includes('search:');
const hasSearchProvider = configContent.includes("provider: 'local'");
console.log(`  ${hasSearch ? '✅' : '❌'} search 配置存在`);
console.log(`  ${hasSearchProvider ? '✅' : '❌'} 搜索提供者配置`);
if (!hasSearch || !hasSearchProvider) allPassed = false;

// 检查多级嵌套支持
console.log('\n🌳 检查多级嵌套支持:');
const hasCollapsed = configContent.includes('collapsed:');
const hasNestedItems = configContent.match(/items:\s*\[/g);
const nestedCount = hasNestedItems ? hasNestedItems.length : 0;
console.log(`  ${hasCollapsed ? '✅' : '❌'} 支持可折叠分组`);
console.log(`  ${nestedCount > 5 ? '✅' : '❌'} 支持多级嵌套 (发现 ${nestedCount} 个 items 配置)`);
if (!hasCollapsed || nestedCount <= 5) allPassed = false;

console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ 所有验证通过！配置完整。');
  process.exit(0);
} else {
  console.log('❌ 验证失败！请检查上述错误。');
  process.exit(1);
}
