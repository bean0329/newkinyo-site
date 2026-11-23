/*
 * Newkinyo 全站统计（GA4 + 转化埋点）
 *
 * 启用方法（只改这一个文件）：
 * 1. 到 analytics.google.com 创建 GA4「网络」媒体资源（网站地址填 https://newkinyo.com）
 * 2. 复制衡量 ID（形如 G-1ABC2DEF3G）
 * 3. 把你的 ID 填进下方 GA4_ID 引号里，保存即可，全站 18 个页面自动生效
 *
 * 自动埋点的事件（GA4 报告 → 事件 里可直接看）：
 *   whatsapp_click  — 点击任何 WhatsApp 按钮/浮窗
 *   phone_click     — 点击电话号码
 *   email_click     — 点击邮箱
 *   quote_click     — 点击任何"Get Quote / Contact"入口
 *   inquiry_submit  — 联系页询盘表单提交
 *   guide_click     — 点击页脚 Buying Guides 内链
 */
var GA4_ID = ""; // ← 把你的 GA4 衡量 ID（形如 G-1ABC2DEF3G）填到这对引号里

(function () {
  "use strict";
  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    var p = params || {};
    p.event = name;
    window.dataLayer.push(p);
  }

  // 点击事件统一委托（capture 阶段，链接跳转前必触发）
  document.addEventListener("click", function (e) {
    var t = e.target;
    var a = t && t.closest ? t.closest("a") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var cls = (a.className || "").toString();
    if (href.indexOf("wa.me") !== -1 || href.indexOf("whatsapp") !== -1 || cls.indexOf("whatsapp") !== -1) {
      track("whatsapp_click", { page_path: location.pathname, link_text: (a.textContent || "").trim().slice(0, 60) });
    } else if (href.indexOf("tel:") === 0) {
      track("phone_click", { page_path: location.pathname });
    } else if (href.indexOf("mailto:") === 0) {
      track("email_click", { page_path: location.pathname });
    } else if (href.indexOf("/contact") !== -1) {
      track("quote_click", { page_path: location.pathname });
    } else if (a.closest(".guides-nav")) {
      track("guide_click", { destination: href, page_path: location.pathname });
    }
  }, true);

  // 询盘表单提交
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function () {
      track("inquiry_submit", { page_path: location.pathname });
    });
  }

  // GA4 动态加载；ID 未替换（仍是占位符）时自动不加载、不报错
  if (GA4_ID.indexOf("G-") === 0) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    s.onload = function () {
      function gtag() { window.dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", GA4_ID);
    };
    document.head.appendChild(s);
  }
})();
