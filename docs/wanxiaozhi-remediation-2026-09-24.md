# 万小智诊断整改：执行提示词与证据

## 专业执行提示词

作为 MTT Packaging 的 SEO/GEO 与前端工程协作者，依据用户提供的万小智首页诊断，先核对当前生产 HTML、响应头、源码与部署配置，再实施有证据且有采购价值的优化，并完成发布。使用已安装 claude-seo、geo-seo-claude、seo-skill 的适用规则与仓库内容质量要求。

1. 将诊断建议视为待核查线索，不将字数、媒体数量、Schema 数量或评分直接当作排名依据。保留有效 URL、canonical、索引设置与询盘功能。
2. 精简首页专属标题与描述，以真实产品类别和明确询盘行动表达采购意图；保留 Organization 的完整事实描述。
3. 首页补充可被无 JavaScript 客户端读取的四类包装采购比较表和询价准备清单。内容突出结构、产品保护、运输及样品确认；不编造成本、认证、测试、交期或客户案例，不为评分强加视频和音频。
4. 为页面实际展示的包装列表增加对应 ItemList，数据与可见表格同源。首页没有祖先层级，不添加虚构面包屑。保留与事实一致的现有实体。
5. 根据托管能力落实安全策略。检查实际 HTTP 响应；不将无效的 _headers 文件或 meta 标签宣称为服务端安全响应头。页面 CSP 必须兼容设计工具、Formspree、图片及现有脚本。无法在 GitHub Pages 配置的响应头列为明确待办，不擅自更换托管或 DNS。
6. 检查新增表格的手机布局、JSON-LD、描述长度和无 JS 可读性，运行已有发布检查，保留回滚点，沿用现有部署并核对线上版本与内容。不得提交真实询盘。
7. 交付真实已完成项、未解决的托管限制及发布证据，不保证第三方工具评分、收录、排名或 AI 引用。

## 发布前核查

- 生产基线：d950bfd0ddee32b0cd9e57adadafb9a1307ee386。
- 原始 HTML 提取正文文本（排除 script/style/noscript，含导航及页脚）约 941 词。因此截图的28词不能作为内容稀薄的可靠证据。
- 当前 HTTP server 为 GitHub.com；未返回 HSTS、X-Content-Type-Options、X-Frame-Options、Content-Security-Policy、Referrer-Policy。
- 首页现有23张图片、完整FAQ及品牌/服务JSON-LD；新增采购表格和列表以提升实际决策效率，不添加无来源视频。
- 范围：主页元信息、可见采购表格/清单、ItemList、安全策略与发布记录。

## 安全策略边界

本轮可在页面落实 Referrer Policy 与 CSP 的 object-src、base-uri、upgrade-insecure-requests。meta CSP 不等同于 HTTP 响应头，也不支持 frame-ancestors。HSTS、nosniff、X-Frame-Options 和响应头形式的 CSP/Referrer-Policy 需可配置的服务器或 CDN；本次不变更域名解析或购买服务。

参考：https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy

## 编辑评估

采购问题清晰9/10，独立判断17/20，技术实用性18/20，自然表达14/15，SEO9/10，GEO9/10，事实边界10/10，询盘下一步5/5：91/100。为内部编辑判断，不是搜索效果得分。内容基于当前产品分类，未新增商业承诺。

## 验证结果

- 构建成功；check:release全部通过，549条sitemap URL及40篇文章的既有检查通过。
- 首页390px/1440px浏览器检查：无页面横向溢出、无页面脚本异常；可见比较表4行，ItemList 4项一致。
- 设计工具iframe成功加载，读取到25个交互按钮；未发送询盘。
- Referrer Policy与有限范围meta CSP已在浏览器DOM确认，后者未限制现有脚本来源。不宣称其具备完整防XSS策略或HTTP响应头效果。
- 未添加BreadcrumbList：首页无祖先层级；未新增视频/音频，没有对应真实素材。

## 仍需托管层处理

需要在现有可配置CDN/反向代理或服务器层返回以下响应头，并先检查相关子域与嵌入用途。GitHub Pages当前部署不能通过项目文件任意设置HTTP响应头。

- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN（保留站内设计工具iframe）
- Referrer-Policy: strict-origin-when-cross-origin
- Content-Security-Policy: object-src 'none'; base-uri 'self'; frame-ancestors 'self'; upgrade-insecure-requests
- HSTS：确认HTTPS稳定后分阶段启用；本次不添加includeSubDomains或preload承诺。

此待办需要确定可用的CDN/服务器管理入口；没有伪造已修复状态。
