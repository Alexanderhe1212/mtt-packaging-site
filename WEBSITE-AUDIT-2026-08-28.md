# MTT Packaging 网站全面诊断 & 改进方案

> 基于现有网站源码审查 + 7 家同行网站调研 + SEO/AEO 专业分析
> 编制时间：2026-08-28

---

## 一、当前网站诊断

### ✅ 已做好的基础

| 维度 | 现状 |
|------|------|
| 视觉风格 | 干净留白、高端定位，无工厂 B2B 批发感 |
| SEO 基础 | JSON-LD（Organization/BreadcrumbList/HowTo/Article/FAQPage）、robots.txt、sitemap、hreflang、canonical、llms.txt 全有 |
| 页面结构 | 首页→packaging→industries→insights→how-we-work→sustainability 完整 |
| 内容深度 | 4 个行业页（含 FAQ）、7 篇知识文章、8 个包装结构详解 |
| 双语支持 | EN 主站 + ZH hreflang |
| 可持续性 | 用词谨慎合规，无虚假声明 |
| 技术栈 | Next.js 静态导出 + EdgeOne CDN，加载快 |

---

### ❌ 必须修改的问题（按严重度排序）

#### 1. WhatsApp 号码不一致 🔴 致命
- 首页浮动按钮 + 联系区域：+86 172 0711 0964
- CLAUDE.md：+86 130 4985 8666
- **已确认**：正确号码是 +86 172 0711 0964（与首页一致）
- **修复**：将 CLAUDE.md 中的号码改为 +86 172 0711 0964，llms.txt 中的号码已是正确的

#### 2. 顾问人名不一致 🔴 严重
- 首页 + llms.txt：Hugo He（Custom Packaging Consultant）
- CLAUDE.md：Gary He（Factory Owner / 厂长）
- **已确认**：统一使用 Hugo He（页面上的人名）
- **修复**：将 CLAUDE.md 和 llms.txt 中的 Gary He 改为 Hugo He

#### 3. 品牌感 vs 个人感失衡 🟡 中等
- 首页 Hero："Your packaging. <i>Considered by Hugo.</i>"
- 整个网站把 Hugo He 推到最前面，"MTT Packaging" 退居二线
- **问题**：如果 Hugo 离开或团队扩展，品牌资产为零
- **建议**：保留 Hugo 作为"直接联系人"，但主页 Hero 应强化 MTT Packaging 品牌

#### 4. 联系表单极简 🟡 中等
- 现有字段：Name、Company、Message → `mailto:alexanderhe1212@gmail.com`
- **问题**：Gmail 地址看起来不专业；表单无法收集关键信息（行业、结构偏好、数量、国家）；没有 WhatsApp 优先选项
- **改进**：增加行业/结构/数量/国家字段；表单提交后引导至 WhatsApp 预填消息

#### 5. 文章→询盘转化链断裂 🟡 中等
- 7 篇文章末尾 CTA 都链接到 `/#contact`（跳回首页顶部）
- **问题**：用户读完文章后被打断体验，跳到完全不同的页面
- **改进**：每篇文章末尾嵌入相关内容推荐 + 浮动 WhatsApp CTA

#### 6. 无社交证明 🟡 中等
- 首页只有 "500+ custom projects shipped worldwide" 文字
- **缺失**：无客户 Logo、无客户评价、无案例数据
- **改进**：添加客户 Logo 轮播（即使是匿名行业 Logo）、案例成果

#### 7. 文章 Schema 缺少日期字段 🟡 SEO 问题
- Article Schema 没有 `datePublished` 和 `dateModified`
- **后果**：Google 不信任文章时效性，排名受损
- **修复**：在 `articles.ts` 中添加日期字段

#### 8. Selected Work 图片重复 🟢 轻微
- 4 个行业 Tab 全部显示同一张 `/selected-work-concepts.png`
- **改进**：每个行业用对应的行业图片

---

## 二、同行网站调研摘要

### 研究对象（7 家）

| 公司 | 类型 | 核心优势 | 值得学习 |
|------|------|----------|----------|
| **Packlane** | 自助式包装平台 | 3D 配置器 + 实时报价 + 25000+ 品牌信任 | 双路径转化（自助工具 vs 询价表单）；FAQ 覆盖完整买家旅程 |
| **Arka** | Shopify 生态包装 | 40+ 产品细分页面 + 免费样品 + 30 天退样品费 | 大量长尾 SEO 页面；资源中心（Packaging 101、Checklist）；免费样品作为转化钩子 |
| **Prime Line Packaging** | 高端定制包装 | 30+ 知名客户 Logo（Bloomingdale's/Ray-Ban/BOSS）+ 8 个详细案例 | 客户 Logo 社会证明；案例按品牌名命名的独立页面；行业垂直导航 |
| **Custom Box Agency** | 品牌体验包装 | 情感营销（"AI 时代不可替代的实体体验"） | 获客/交付/留存三路径结构；极简表单（先抓邮箱再深度跟进） |
| **Berlin Packaging** | 综合包装集团 | 全品类覆盖 + 全球供应链 | 行业知识库 + 技术规格下载 |
| **Sunrise Packaging** | 精品硬盒 | 硬盒专业定位 | 结构分类清晰 + 工艺说明详细 |
| **HH Deluxe Packaging** | 奢侈品包装 | 珠宝/香水/化妆品垂直 | 高端视觉 + 定制流程展示 |

### 同行共同打法（MTT 应学习的）

1. **客户 Logo 墙** — 几乎所有成熟公司都展示客户 Logo，是 B2B 网站的标配信任信号
2. **案例研究** — 带品牌名、挑战、方案、成果的详细案例（Prime Line 有 8 个独立案例页）
3. **资源中心 / Packaging 101** — 教育性内容既获流量又建立专业权威
4. **免费样品** — Arka 的"样品费 30 天内下单全退"是极强转化钩子
5. **行业细分页面** — Arka 有 40+ 产品页，每页针对一个长尾关键词
6. **FAQ 覆盖全链路** — 从选材、MOQ、打样、交期到认证，覆盖买家每个决策疑问
7. **双 CTA 策略** — "立即设计"（自助）+ "申请报价"（人工），满足不同阶段访客

---

## 三、SEO / AEO 优化机会

### SEO 高价值关键词（MTT 目前未覆盖）

```
长尾关键词（搜索意图强、竞争低）：
- custom rigid box manufacturer China
- luxury perfume box packaging supplier
- jewelry box packaging wholesale custom
- magnetic closure gift box manufacturer
- custom cosmetic packaging boxes China
- foldable rigid box supplier
- premium paper bag manufacturer for brands
- sustainable luxury packaging supplier
- custom PR kit packaging for influencers
- bespoke gift box with embossing and foil

信息类关键词（建权威、获流量）：
- rigid box vs folding carton: when to use which
- how much does custom packaging cost per unit
- packaging material guide: greyboard, SBS, kraft explained
- foil stamping vs embossing vs debossing: differences
- custom packaging MOQ: what to expect
- how long does custom packaging production take
- sustainable packaging materials: a complete guide
- unboxing experience design: a brand guide
```

### AEO（AI 搜索优化）机会

1. **llms.txt 已就位** — 这是巨大优势，大多数同行没有
2. **FAQ 结构化数据** — 行业页已有，但文章页没有
3. **改进方向**：
   - 每篇文章加 FAQPage Schema（用文章内容中的问答对）
   - 在文章中直接回答具体问题（"How much does a custom rigid box cost?"）
   - 添加 `datePublished`/`dateModified` 到 Article Schema
   - 确保每篇文章有明确的作者归属和审核信息

### 内容缺口（7 篇文章应该新增的 8 篇）

现有 7 篇覆盖了选型、误区、成本、供应商评估、结构选择、印刷、开箱体验。
但缺少以下高搜索量主题：

| # | 主题 | 目标关键词 | 预计搜索量 |
|---|------|-----------|-----------|
| 8 | Rigid Box vs Folding Carton: Complete Comparison | rigid box vs folding carton | 高 |
| 9 | Custom Packaging Cost Guide: What Drives the Price | custom packaging cost, packaging price per unit | 高 |
| 10 | Packaging Materials Explained: Greyboard, SBS, Kraft, Corrugated | packaging materials guide | 中 |
| 11 | Foil Stamping vs Embossing vs Debossing: Finishing Guide | foil stamping embossing difference | 中 |
| 12 | How to Write a Packaging Brief: The Complete Template | packaging brief template | 中 |
| 13 | Sustainable Packaging Materials: A Brand Decision Guide | sustainable packaging materials guide | 高 |
| 14 | China Packaging Supplier Guide: What International Brands Need to Know | China packaging supplier, packaging manufacturer China | 高 |
| 15 | Unboxing Experience Design: How Premium Packaging Wins Customers | unboxing experience design | 中 |

---

## 四、买家旅程重构建议

### 现状问题
网站没有明确的买家旅程路径。访客从任何页面进来后，只能通过"Start a project →"跳到首页联系区域，没有中间步骤。

### 建议的三阶段路径

```
认知阶段（Awareness）
├── 博客文章（"What's the right packaging structure?"）
├── Packaging 101 / Materials Guide
└── 引导 → "Learn more about our [industry] packaging"

考虑阶段（Consideration）
├── 行业页（详细结构 + 优先级 + FAQ）
├── 结构详情页（8 个包装结构独立展示）
└── 引导 → "See how this works for [your industry]"

决策阶段（Decision）
├── How We Work（流程透明化）
├── 案例研究（带数据的真实项目）
├── WhatsApp 一键联系（预填消息）
└── 引导 → "Share your product size and get a quote"
```

---

## 五、WhatsApp 获客整合方案

### 为什么 WhatsApp 是正确选择
- 外贸包装客户的沟通习惯：WhatsApp > Email > 表单
- 即时性：买家在浏览网站时就可能发起对话
- 信任感：一对一沟通比冷冰冰的表单更有人情味
- 可追踪：WhatsApp Business 有自动回复和标签管理

### 实施建议

1. **浮动 WhatsApp 按钮**（已有，保留）
2. **WhatsApp 预填消息**：
   - 首页：`Hi, I'm interested in custom packaging for my brand. Can we discuss?`
   - 行业页：`Hi, I'm looking for custom [perfume/jewelry/cosmetics/gift] packaging. Can you help?`
   - 文章末尾：`Hi, I just read your article about [topic]. I have a packaging project I'd like to discuss.`
3. **表单提交后**：显示 WhatsApp 快捷链接，让访客选择通过 WhatsApp 继续对话
4. **WhatsApp Business 欢迎消息**：自动回复 + 询价引导

---

## 六、行动优先级

### P0 — 立即修复（影响基础可信度）✅ 已确认
- [ ] 统一 WhatsApp 号码为 +86 172 0711 0964（修复 CLAUDE.md）
- [ ] 统一人名为 Hugo He（修复 CLAUDE.md 中的 Gary He）
- [ ] 统一邮箱为 info@mttpackaging.com（替换 alexanderhe1212@gmail.com）
- [ ] 文章 Schema 添加日期字段

### P1 — 本周完成（提升转化率）
- [ ] 联系表单增加行业/结构/数量/国家字段
- [ ] 文章末尾 CTA 改为页面内浮动 WhatsApp 按钮（不跳转）
- [ ] Selected Work 图片去重
- [ ] 每个行业页 CTA 链接增加预填 WhatsApp 消息

### P2 — 两周内完成（SEO 增长）
- [ ] 新增 3-5 篇知识文章（见上方推荐主题）
- [ ] 文章页添加 FAQPage Schema
- [ ] 添加客户 Logo 社会证明区域
- [ ] 每篇文章添加相关文章推荐

### P3 — 一个月内完成（深度优化）
- [ ] 创建 Packaging Resources 中心页面
- [ ] 添加案例研究独立页面（2-3 个带数据的真实案例）
- [ ] 考虑添加免费样品申请机制
- [ ] 优化 llms.txt 内容（增加更多结构化信息）

---

*本文档基于对现有网站 9 个页面源码的完整审查 + 7 家同行网站的实时抓取分析编写*
