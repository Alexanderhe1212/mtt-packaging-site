# MTT Packaging 网站优化 — Claude Code 专业提示词

> 复制以下提示词直接粘贴到 Claude Code 中执行。
> 执行前请确认 WhatsApp 号码和顾问人名。

---

```
请先完整阅读 CLAUDE.md 和 WEBSITE-AUDIT-2026-08-28.md。

我是一个外贸包装销售经理，通过 WhatsApp 成交客户。这个网站的唯一目的是获客。
请按照以下优先级系统性地修改网站，每完成一个阶段告诉我改了什么，等我确认后再继续下一阶段。

## 背景
- 品牌：MTT Packaging，高端定制包装解决方案
- 网站顾问/联系人：Hugo He（Custom Packaging Consultant）
- 正确的 WhatsApp 号码：+86 172 0711 0964
- 主要市场：国际品牌（珠宝、香水、美妆、礼品）
- 成交方式：WhatsApp 为主，Email 为辅
- 语调：专业、克制、留白、高端——不是工厂批发感

## 第一阶段：基础修复（必须先做）

### 1.1 统一联系信息
- 全站 WhatsApp 号码统一为：+86 172 0711 0964
- 全站顾问人名统一为：Hugo He（保持现有页面上的人名不变，将 CLAUDE.md 和 llms.txt 中的 Gary He 改为 Hugo He）
- 邮箱统一为：info@mttpackaging.com（替换 alexanderhe1212@gmail.com）

### 1.2 修复 Article Schema
- 在 lib/articles.ts 中为每篇文章添加 datePublished 和 dateModified 字段
- 在 app/insights/[slug]/page.tsx 的 JSON-LD 中输出这两个字段
- 格式：ISO 8601（"2026-08-15"）

### 1.3 修复 llms.txt
- 更新顾问人名为 Hugo He
- 更新 WhatsApp 号码为 +86 172 0711 0964
- 更新邮箱为 info@mttpackaging.com

## 第二阶段：WhatsApp 获客优化

### 2.1 WhatsApp 预填消息（按页面定制）
- 首页浮动按钮：预填 "Hi MTT Packaging! I'm interested in custom packaging for my brand. Can we discuss?"
- 各行业页浮动按钮：预填对应行业消息，例如香水页 "Hi! I'm looking for custom perfume packaging. I have a project to discuss."
- 文章页浮动按钮：预填 "Hi! I just read your article about [文章标题]. I'd like to discuss a packaging project."

### 2.2 联系表单增强
在 app/page.tsx 的联系表单中增加以下字段（在 Company 之后）：
- Industry（下拉选择：Perfume & Fragrance / Cosmetics & Skincare / Jewelry & Watches / Gift Sets & PR Kits / Other）
- Packaging Type（下拉选择：Rigid Box / Folding Carton / Paper Bag / Custom Insert / Not sure）
- Estimated Quantity（下拉选择：500–1,000 / 1,000–5,000 / 5,000–10,000 / 10,000+）
- Country（文本输入，placeholder: "e.g. United States"）
保留原有的 Name、Company、Message 字段。
表单提交仍用 mailto，但 subject 行改为 "Quote Request: [Industry] - [Country] - MTT Packaging"
表单下方添加一行文字："Prefer WhatsApp? Message us directly →" 链接到 WhatsApp。

### 2.3 文章页 CTA 改进
- 将文章末尾的 "Start your project ↗" 链接从 /#contact 改为 WhatsApp 链接
- 添加一行说明："Message Hugo on WhatsApp for a quick response about your project."

## 第三阶段：信任信号

### 3.1 客户 Logo 社会证明
在首页 "500+ custom projects shipped worldwide" 下方添加一个客户 Logo 区域：
- 标题："Trusted by brands in fragrance, cosmetics, jewelry and gifting"
- 由于没有真实客户授权 Logo，先用一组行业图标 + 知名品牌名的文字列表
- 设计为横向滚动或网格布局
- 样式保持与网站一致的灰白色调、低对比度

### 3.2 案例数据化
将现有的行业页中的通用描述升级为带数据的简短案例：
- 每个行业页的 Selected Work 区域使用对应行业图片（不再共用同一张）
- 添加简短的项目描述，例如："Shoulder-neck rigid box for a niche fragrance brand — 3,000 units, delivered to France"

## 第四阶段：内容 SEO 增长

### 4.1 新增知识文章（在 lib/articles.ts 中添加）
新增以下 3 篇高价值文章（每篇 4-5 个段落，每段 250-400 词）：

**文章 8: "Rigid Box vs Folding Carton: Which Structure Fits Your Packaging Project?"**
- 角度：How to choose
- 覆盖：成本差异、最低起订量、适用场景、印刷能力、交付周期
- 目标关键词：rigid box vs folding carton

**文章 9: "Understanding Custom Packaging Costs: What Drives the Price"**
- 角度：Budget
- 覆盖：材料成本、印刷工艺、起订量与单价关系、模具费、隐藏成本
- 目标关键词：custom packaging cost, packaging price per unit

**文章 10: "A Brand Guide to Packaging Materials: Greyboard, SBS, Kraft and Corrugated"**
- 角度：Materials
- 覆盖：每种材料特性、适用场景、成本区间、环保属性
- 目标关键词：packaging materials guide, greyboard vs SBS

### 4.2 文章 FAQPage Schema
在每篇文章的 JSON-LD 中添加 FAQPage Schema：
- 从文章内容中提取 2-3 个问答对
- 问题使用搜索友好的长尾问句
- 答案简洁（50-100 词），直接回答

### 4.3 文章页相关推荐
在每篇文章末尾、CTA 之前，添加"Related articles"区域：
- 推荐 2 篇相关文章
- 链接到对应文章页面
- 样式保持简洁

## 设计规范（必须遵守）
- 保持现有的留白风格和灰白色调
- 不使用鲜艳颜色、动画或弹窗
- 所有新增内容的字体、间距、边框与现有页面一致
- 新增的 WhatsApp 浮动按钮使用 WhatsApp 绿色 (#25D366)，尺寸与现有按钮一致
- 联系表单样式与现有 form-input/form-row 一致
- 新增文章图片暂时复用现有图片

## 技术约束
- 修改顺序：lib/ 文件 → app/ 页面 → components/ → public/ → llms.txt
- 每次修改后运行 pnpm lint 确保无错误
- 不修改 .gitignore、next.config.ts、vite.config.ts、tsconfig.json
- 不修改现有的 JSON-LD 类型（Organization、BreadcrumbList、HowTo），只扩展
- 不添加新的 npm 依赖
- 保持静态导出兼容（MTT_STATIC_EXPORT=1 pnpm build 必须通过）

## 禁止事项
- 不要添加不锈钢金属罐、铝合金瓶、通用金属容器等非包装产品
- 不要做虚假声明（如"全球最低价"、"100% 可持续"）
- 不要修改 DNS、GitHub Pages 或 EdgeOne 设置
- 不要使用"零浪费"、"100%可持续"、"无绿色溢价"等绝对化环保措辞
- 不要使用弹窗、模态框或强制注册
```

---

## 使用说明

1. **复制上面代码块中的全部内容**
2. **粘贴到 Claude Code 中**（WhatsApp 号码和人名已确认，无需替换）
3. Claude 会分阶段执行，每个阶段完成后等你确认再继续
4. 每个阶段完成后运行 `pnpm lint` 和 `MTT_STATIC_EXPORT=1 pnpm build` 验证
