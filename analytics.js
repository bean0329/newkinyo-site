/*
 * Newkinyo 全站统计（GA4 + Microsoft Clarity 热力图 + 转化埋点）
 *
 * 启用只需改下面两行（其余都不用动）：
 *   GA4_ID     = Google Analytics 衡量 ID（形如 G-1ABC2DEF3G）
 *   CLARITY_ID = Microsoft Clarity 项目 ID（见 clarity.microsoft.com 项目设置）
 *
 * v2 修复：js/config 提前到脚本解析阶段入队，事件不再因 gtag.js 未加载而丢失。
 *
 * 自动埋点的事件（GA4 → 报告 → 实时 / 事件 里可直接看）：
 *   whatsapp_click  — 点击任何 WhatsApp 按钮/浮窗
 *   phone_click     — 点击电话号码
 *   email_click     — 点击邮箱
 *   quote_click     — 点击任何 "Get Quote / Contact" 入口
 *   inquiry_submit  — 联系页询盘表单提交
 *   guide_click     — 点击页脚 Buying Guides 内链
 */

// ============ 在这里填 ID ============
var GA4_ID = "G-QB94NPHD5J";     // ← Google Analytics 衡量 ID
var CLARITY_ID = "zi1esr5i22";   // ← Microsoft Clarity 项目 ID
// ====================================

(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  // 关键修复：gtag 立即可用，事件先进队列，等 gtag.js 加载后按序回放
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  // 先入队 js + config，再异步加载 gtag.js —— 保证 config 排在任何事件之前
  if (GA4_ID.indexOf("G-") === 0) {
    gtag("js", new Date());
    gtag("config", GA4_ID, { anonymize_ip: true });

    var gs = document.createElement("script");
    gs.async = true;
    gs.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    gs.onload = function () { setTimeout(flushQueue, 50); };
    gs.onerror = function () { flushQueue(); };
    setTimeout(flushQueue, 4000); // 兜底：4 秒后无论如何补发
    (document.head || document.documentElement).appendChild(gs);
  }

  // 事件队列：gtag.js 就绪前先缓存，加载完成后按序补发，确保不丢事件
  var nkReady = false, nkQueue = [];
  function flushQueue() {
    if (nkReady) return;
    nkReady = true;
    while (nkQueue.length) {
      var item = nkQueue.shift();
      gtag("event", item[0], item[1]);
    }
  }

  function track(name, params) {
    var p = params || {};
    if (!p.page_path) p.page_path = location.pathname;
    if (!nkReady) { nkQueue.push([name, p]); return; }
    gtag("event", name, p);
  }
  window.__nkTrack = track;

  // 便于控制台自查：__nkEvents() 返回已记录的事件名
  window.__nkEvents = function () {
    return window.dataLayer
      .filter(function (x) { return x && x.length !== undefined && x[0] === "event"; })
      .map(function (x) { return x[1]; });
  };

  // 点击事件统一委托（capture 阶段，跳转前必定触发）
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var a = t.closest("a");
    if (a) {
      var href = a.getAttribute("href") || "";
      var cls = (a.className || "").toString();
      var text = (a.textContent || "").trim().slice(0, 60);

      if (href.indexOf("wa.me") !== -1 || href.indexOf("whatsapp") !== -1 || cls.indexOf("whatsapp") !== -1) {
        track("whatsapp_click", { link_text: text });
      } else if (href.indexOf("tel:") === 0) {
        track("phone_click", { link_text: text });
      } else if (href.indexOf("mailto:") === 0) {
        track("email_click", { link_text: text });
      } else if (href.indexOf("/contact") !== -1) {
        track("quote_click", { link_text: text });
      } else if (a.closest(".guides-nav")) {
        track("guide_click", { destination: href });
      }
      return;
    }

    // 兜底：非 <a> 实现的 WhatsApp 按钮（div/button + onclick）
    var el = t.closest("[class*='whatsapp'], [onclick*='wa.me']");
    if (el) track("whatsapp_click", { link_text: (el.textContent || "").trim().slice(0, 60) });
  }, true);

  // 询盘表单提交
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function () {
      track("inquiry_submit");
    });
  }

  // Microsoft Clarity 热力图（无需手动埋点）
  if (CLARITY_ID) {
    var c = document.createElement("script");
    c.async = true;
    c.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    (document.head || document.documentElement).appendChild(c);
  }
})();
