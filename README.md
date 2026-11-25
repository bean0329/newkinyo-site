# newkinyo.com 优化动作执行结果

生成时间：2026-11-25
依据：对线上站点 newkinyo.com 全部 16 个页面的实测（2026-11-25），而非聊天记录或假设。

## 一、最重要的判断：旧代码包必须废弃

`newkinyo-seo-code/` 是此前基于"空白站点"假设生成的通用模板，与你的真实站点冲突：

| 项目 | 旧代码包（虚构） | 线上真实数据 |
|---|---|---|
| 价格 | $0.45 单一价 | EXW $0.32–0.50 阶梯价 |
| MOQ | 500 pcs | 100 pcs/色 |
| 尺寸 | 14×22 cm | 16×22 cm (+/-2cm) |
| 重量 | 20 g | 16–17 g |
| 询盘邮箱 | sales@newkinyo.com | bean@newkinyo.com |
| URL 结构 | /product-100-viscose-bath-mitt | /viscose |

**结论：不要用旧代码包覆盖线上任何页面**，否则会把真实可信的 B2B 数据替换成错误数字。本次执行完全绕开旧包，改为基于线上真实代码风格做增量。

## 二、26 条动作的判断结果

对线上实测后，26 条动作的实际意义分为四类：

- **已被线上实现（14 条）**：1–10、17–24。你的站点已有独立产品页、真实规格表、100% 图片 ALT 覆盖（75/75）、13 页 FAQPage、Product/AggregateOffer 结构化数据、全站内链、WhatsApp+邮箱+表单询盘体系。**这些不需要重做**，重做只会降低质量。
- **真实空白、值得执行（6 条）**：11 Kessa 指南、12 文化风格对比、13 材质科普、14/15/16 三个场景页。已全部产出为本次的 6 个新页面。
- **部分覆盖（3 条）**：7 功能词、21 URL slug、25 关键词映射。功能词由新页面自然覆盖；URL 保持线上既有规范；关键词映射已重做。
- **无法代执行（1 条）**：26 Search Console 复盘需你的 GSC 权限，已转化为可执行的 7 步清单。

## 三、本次新增的 6 个页面

全部按线上真实风格编写：每页内嵌 `<style>`（直接复用线上 CSS）、内联 JSON-LD（Organization + Article + BreadcrumbList + FAQPage）、Buying Guides 内链区、WhatsApp 悬浮按钮、`/analytics.js` 与 Cloudflare Insights。

| 页面 | 对应动作 | 覆盖的核心关键词 | Title / Desc 长度 |
|---|---|---|---|
| `/kessa-mitt-guide` | 11 | kessa mitt / kessa glove / kese mitt / kesa mitt | 49 / 154 |
| `/bath-mitt-styles-guide` | 12 | korean / hammam / moroccan / turkish bath mitt（27 个文化词） | 51 / 154 |
| `/why-100-viscose` | 13 | 100% viscose / viscose rayon / 150D / natural fiber（23 个材质词） | 53 / 150 |
| `/scene-bath-mitt-scrubbing` | 14 | bath mitt / dead skin remover / self tan / tan removal | 55 / 155 |
| `/scene-bath-gloves-soaking` | 15 | bath gloves / bath shower gloves / shower gloves | 51 / 147 |
| `/scene-at-home-hammam` | 16 | at home hammam / hammam glove / spa exfoliating glove | 52 / 154 |

所有产品参数均取自线上真实页面：100% viscose rayon、16×22 cm、16–17 g、14 色（定制 Pantone 10,000 pcs）、MOQ 100 pcs、EXW $0.32–0.50、免费样品 3–5 天、现货 3–15 天、定制 15–25 天。

## 四、落地步骤（需要你操作）

1. **上传页面**：把 `newkinyo-new-pages/` 下 6 个 `.html` 上传到网站根目录，使 URL 分别为 `https://newkinyo.com/kessa-mitt-guide` 等（与文件名一致，去掉 `.html`——如你的服务器不支持无扩展名，可保留 `.html` 并同步修改 canonical）。
2. **更新 sitemap**：把线上 `sitemap.xml` 中新增 6 条 `<url>`（见 `sitemap-new-pages.xml`），提交 Google Search Console。robots.txt 无需改动（已正确声明 sitemap 与 AI 爬虫）。
3. **更新内链（代码已改好，只需覆盖上传）**：`newkinyo-updated-existing/` 下 16 个 HTML 是线上同名页面的更新版，仅底部 Buying Guides 导航区增加了 6 条新页面链接，其他内容与原文件逐字节一致。把这 16 个文件按同名覆盖上传到网站根目录即可完成双向互链。若只想先改 6 篇指南文章页，可只上传 `vs-guide`→`/viscose-vs-sponge-vs-african-net-sponge`、`moq-price`→`/exfoliating-glove-moq-price-guide`、`verify`→`/how-to-verify-bath-glove-manufacturer`、`oem-odm`→`/oem-vs-odm-private-label-guide`、`african-guide`→`/african-net-sponge-wholesale-guide`、`amazon-fba`→`/amazon-fba-glove-supplier-checklist` 这 6 个对应文件；但导航块是全站共用模块，建议 16 个全部覆盖，内链效果才完整。
4. **验证**：用 GSC 的 URL 检查工具逐个提交新 URL；确认结构化数据用 Rich Results Test 无报错。
5. **持续复盘**：按《优化动作价值判断与执行报告.xlsx》第 3 表执行月度复盘。

## 五、双向内链（代码已更新完成）

Buying Guides 底部导航是全站共用模块，线上 16 个页面全部含有它。现已统一为 **12 条链接**：原有 6 条保持原顺序与锚文本不变，末尾追加 6 条新页面链接：

| 追加的链接 | 锚文本 |
|---|---|
| `/kessa-mitt-guide` | Kessa Mitt Guide |
| `/bath-mitt-styles-guide` | Bath Mitt Styles Compared |
| `/why-100-viscose` | Why 100% Viscose |
| `/scene-bath-mitt-scrubbing` | Bath Mitt Scrubbing Routine |
| `/scene-bath-gloves-soaking` | Bath Gloves for Soaking |
| `/scene-at-home-hammam` | At-Home Hammam Ritual |

- 6 个新页面文件已原地更新，导航同样为 12 条（既链回旧页，也互链新页）——**双向内链现已闭环**。
- 16 个线上页面更新版在 `newkinyo-updated-existing/`，样式与线上完全一致（同一段内联 CSS），只改导航区。
- 生成器 `.execute.ref/build_pages.py` 的 `GUIDES` 常量已同步，日后重新生成新页面不会丢失这 6 条链接（已实测重生成后仍为 12 条）。
- 校验：22 个页面每页恰好 1 个导航块、12 条链接、无重复 URL；16 个现有页面除导航块外与原文件完全一致。

## 六、校验结果

- 6 个页面 Title 全部 ≤60 字符，Description 全部 120–160 字符。
- 每页 4 段 JSON-LD 均为合法 JSON，类型与线上既有页面完全一致。
- canonical 指向 https://newkinyo.com/<slug>，与 sitemap 一致。
- 全页使用线上原版 CSS，视觉与现有站点一致。
- 未出现任何虚构价格、MOQ 或规格。
