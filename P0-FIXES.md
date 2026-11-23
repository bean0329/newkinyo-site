# P0 修复清单（2026-11-23）

本次提交修复了诊断报告中的 5 个 P0 问题。第 6 个（装统计工具）需要你的账号，见文末步骤。

## 已修复

### 1. 全站软 404 → 新增 `404.html`
任意不存在的 URL 之前都返回 200 + 首页内容。
- **文件改动**：新增 `404.html`（含导航、WhatsApp CTA、`noindex` 标记）
- **⚠️ 必须手动做一步**：Cloudflare Dashboard → Workers & Pages → 你的项目 → Settings → **404 page handling / Not found handling**，从 `Single-page application` 改为 `404 page`。不改这个设置，文件不会生效。
- **验证**：`curl -o /dev/null -w "%{http_code}" https://newkinyo.com/nonexistent-xyz` 应返回 `404`

### 2. llms.txt 假文件 → 新增真实 `llms.txt`
AI 搜索引擎（ChatGPT / Perplexity / Claude）专用的站点说明文件，内容为公司事实 + 10 个页面摘要 + 引用注意事项。与 `_headers` 配合会以 `text/plain` 输出。

### 3. 首页零结构化数据 → `index.html` 新增 JSON-LD
- `Organization`（含 `@id`、logo、新电话 +86-158-1501-9440、邮箱、地址、出口市场、联系点）
- `WebSite`（publisher 关联到 Organization）
- 顺带补了全站缺失的 **favicon**（指向 `assets/logo.avif`，512×512）
- 注意：`sameAs` 字段暂未写入——等你把 LinkedIn / Alibaba 档案建好后，把真实链接补进 Organization 里再启用，填不存在的链接比不填更糟。

### 4. canonical 错误 → 修复 2 处，全站 11/11 正确
| 页面 | 修复前 | 修复后 |
|---|---|---|
| newkinyo-amazon-top-sellers-supplier | `href="amazon-top-sellers-supplier.html"`（相对路径+缺前缀，指向不存在的 URL） | `https://newkinyo.com/newkinyo-amazon-top-sellers-supplier` |
| index | `https://newkinyo.com` | `https://newkinyo.com/`（与实际地址一致） |

### 5. 两详情页 74% 重复 → 重写 `design-detail.html`
- 正文相似度：**0.74 → 0.17**，正文词数 360 → 613
- H1：「2027 New Arrival … brand show」→「Custom Printed 100% Viscose Bath Mitts - Your Logo, Wash-Fast Pattern」（去掉年份定时炸弹，关键词前置）
- 四个标签页全部改为定制印花视角：打样流程、SDS 认证、洗后不褪色、Pantone 对色、FBA 包装
- FAQ 从 4 条扩到 6 条，且与页面内的 `FAQPage` 结构化数据**逐字同步**（Google 要求两者一致）
- 修复原文错字（"Themitss"），报价按钮文案改为与页面匹配并做了 URL 编码
- `viscose-detail.html` 未动（它作为现货素色产品页保留原内容）

### 附带：新增 `_headers`
Cloudflare 响应头配置：HSTS、X-Frame-Options、nosniff、`/assets/*` 一年缓存、llms.txt 正确的 Content-Type。若你的部署是 Workers（而非 Pages），此文件不生效但无害。

## 待你操作：装统计（原 P0 第 6 项，约 20 分钟）

1. **Google Search Console**（必装）
   - 打开 https://search.google.com/search-console → 添加资源 → 选「网址前缀」→ 输入 `https://newkinyo.com`
   - 验证方式选「HTML 标记」，复制形如 `<meta name="google-site-verification" content="xxxx">` 的一行
   - 把这行加到 `index.html` 的 `<head>` 里（其他 10 个页面最好也加），推送后回 GSC 点验证
   - 验证通过后：左侧「索引 → 网站地图」提交 `https://newkinyo.com/sitemap.xml`
   - 一周后重点看两个报告：「网页」里的收录情况、「页面体验」里的软 404 是否归零
2. **GA4**（推荐）
   - analytics.google.com → 创建媒体资源 → 数据流 → Web → 拿到 `G-XXXXXXX`
   - 把官方 gtag.js 代码段加到全部 11 个页面 `</head>` 前（可以和 GSC 验证标签一起加）
3. **Bing Webmaster**（顺手做）
   - https://www.bing.com/webmasters → 可直接「从 Google Search Console 导入」，一条命令覆盖 Bing/DuckDuckGo 收录

## 本次改动文件

| 文件 | 类型 |
|---|---|
| `404.html` | 新增 |
| `llms.txt` | 新增 |
| `_headers` | 新增 |
| `assets/logo.avif` | 新增（favicon + Organization logo） |
| `index.html` | canonical、JSON-LD、favicon |
| `newkinyo-amazon-top-sellers-supplier.html` | canonical |
| `design-detail.html` | 内容重写 + FAQPage 同步 |
