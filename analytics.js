/*
 * Newkinyo 全站统计（GA4 + Microsoft Clarity 热力图 + 转化埋点）
 *
 * 启用只需改本文件最下面两行（其余都不用动）：
 *   GA4_ID     = 填 Google Analytics 衡量 ID（形如 G-1ABC2DEF3G）
 *   CLARITY_ID = 填 Microsoft Clarity 项目 ID（一串字母数字，见 clarity.microsoft.com 项目设置）
 *
 * 填好保存后全站 18 个页面自动生效；留空则对应功能不加载、不报错。
 *
 * 自动埋点的事件（GA4 报告 → 事件 里可直接看）：
 *   whatsapp_click  — 点击任何 WhatsApp 按钮/浮窗
 *   phone_click     — 点击电话号码
 *   email_click     — 点击邮箱
 *   quote_click     — 点击任何"Get Quote / Contact"入口
 *   inquiry_submit  — 联系页询盘表单提交
 *   guide_click     — 点击页脚 Buying Guides 内链
 *
 * Clarity 无需手动埋点，自动录制会话、点击热力图和滚动深度。
 */

// ============ 在这里填 ID ============
var GA4_ID = "G-QB94NPHD5J";     // ← Google Analytics 衡量 ID，形如 G-1ABC2DEF3G
var CLARITY_ID = ""; // ← Microsoft Clarity 项目 ID，一串字母数字
// ====================================

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

  // GA4 动态加载
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

  // Microsoft Clarity 热力图动态加载
  if (CLARITY_ID) {
    var c = document.createElement("script");
    c.async = true;
    c.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    document.head.appendChild(c);
  }
})();
