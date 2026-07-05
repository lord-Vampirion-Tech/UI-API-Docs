// ===================== STATE =====================

const state = {
  lang: "ru",
  pages: [],
  currentPageId: null,
  currentPage: null,
  cache: new Map()
};

const callouts = [
  { type: "note", variants: ["Note:", "Примечание:", "Заметка:",] },
  { type: "warning", variants: ["Warning:", "Предупреждение:"] },
  { type: "tip", variants: ["Tip:", "Совет:", "Подсказка:"] }
];

// ===================== ELEMENTS =====================

import matter from "https://cdn.jsdelivr.net/npm/gray-matter/+esm";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/+esm";

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

const navEl = document.getElementById("navigation");
const contentEl = document.getElementById("content");
const langBtn = document.getElementById("lang-btn");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search");
const searchIndex = [];

const sunIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z"/>
  </svg>`;

const moonIcon = `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>
  </svg>`;

langBtn.addEventListener("click", toggleLanguage);

themeToggle?.addEventListener("click", toggleTheme);

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (themeToggle) {
    themeToggle.innerHTML = theme === "light" ? moonIcon : sunIcon;
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.title = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  }
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(currentTheme);
}

applyTheme(getPreferredTheme());

searchInput.addEventListener("input", (e) => {
  const results = searchPages(e.target.value);
  renderNav(results);
});

// ===================================================

function detectCallout(text) {
  const t = text;

  for (const c of callouts) {
    for (const v of c.variants) {
      if (t.startsWith(v)) {
        return {
          type: c.type,
          matched: v
        };
      }
    }
  }

  return null;
}

function customFormat(root) {
  const codeBlocks = root.querySelectorAll("pre code");

  for (const block of codeBlocks) {
    let html = block.innerHTML;

    // пример 1: ":func("
    html = html.replace(
      /:([a-zA-Z_]\w*)(\()/g,
      ':<span class="custom-func1">$1</span>$2'
    );

    // пример 1: ".func("
    html = html.replace(
      /\.([a-zA-Z_]\w*)(\()/g,
      '.<span class="custom-func2">$1</span>$2'
    );


    block.innerHTML = html;
  }

  root.querySelectorAll("blockquote").forEach(block => {
    const p = block.querySelector("p");
    if (!p) return;

    const html = p.innerHTML;

    const result = detectCallout(html);
    if (!result) return;

    const { type, matched } = result;

    block.classList.add(type);

    // ❗ ВАЖНО: не заменяем текст, а просто убираем префикс
    p.innerHTML = html.replace(
      new RegExp(`^${matched}`, "i"),
      `<strong>${matched}</strong>`
    );
  });

}

// ===================== ROUTING =====================

function getRoutePage() {
  const hash = location.hash.replace("#", "").trim();
  return hash || null;
}

function setRoute(pageId) {
  if (!pageId) return;
  location.hash = pageId;
}

// ===================== FRONT MATTER =====================

function parseFrontMatter(raw) {
  const parsed = matter(raw);
  return {
    data: parsed.data || {},
    content: parsed.content || ""
  };
}

// ===================== LOAD PAGES =====================

async function loadPages() {
  const res = await fetch("docs/pages.json");

  if (!res.ok) {
    console.error("Failed to load pages.json");
    state.pages = [];
    return;
  }

  const ids = await res.json();

  const pages = [];

  for (const id of ids) {
    const res = await fetch(`docs/${id}/${state.lang}.md`);
    if (!res.ok) continue;

    const raw = await res.text();
    const parsed = matter(raw);

    const page = {
      id,
      title: parsed.data.title || id,
      depth: parsed.data.depth ?? 0,
      tags: parsed.data.tags || []
    };

    pages.push(page);
  }

  state.pages = pages;
  buildSearchIndex();
}

function normalize(text) {
  return (text || "")
    .toString()
    .toLowerCase()
    .trim();
}


async function buildSearchIndex() {
  searchIndex.length = 0;

  const res = await fetch("docs/pages.json");
  const ids = await res.json();

  for (const id of ids) {

    const ru = await fetch(`docs/${id}/ru.md`).then(r => r.ok ? r.text() : null);
    const en = await fetch(`docs/${id}/en.md`).then(r => r.ok ? r.text() : null);

    const ruData = ru ? matter(ru).data : {};
    const enData = en ? matter(en).data : {};

    searchIndex.push({
      id,
      title: {
        ru: ruData.title || id,
        en: enData.title || id
      },
      tags: [
        ...(ruData.tags || []),
        ...(enData.tags || [])
      ]
    });
  }
}

function searchPages(query) {
  const q = normalize(query);

  if (!q) return state.pages;

  const results = [];

  for (const item of searchIndex) {
    let score = 0;

    const title = normalize(item.title[state.lang]);
    const tags = item.tags.map(normalize);

    if (title.includes(q)) score += 5;

    for (const tag of tags) {
      if (tag.includes(q)) score += 10;
    }

    if (score > 0) {
      results.push({
        id: item.id,
        title: item.title[state.lang],
        score
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
// ===================== LOAD MARKDOWN =====================

async function loadMarkdown(pageId) {
  if (!pageId) {
    contentEl.innerHTML = `<div class="error">No page found</div>`;
    return;
  }

  state.currentPageId = pageId;
  const cacheKey = `${pageId}:${state.lang}`;

  // ===== CACHE =====
  if (state.cache.has(cacheKey)) {
    renderPage(state.cache.get(cacheKey));
    return;
  }

  // ===== FETCH =====
  let res = await fetch(`docs/${pageId}/${state.lang}.md`);

  // fallback language
  if (!res.ok) {
    const fallbackLang = state.lang === "ru" ? "en" : "ru";
    res = await fetch(`docs/${pageId}/${fallbackLang}.md`);

    if (!res.ok) {
      contentEl.innerHTML = `<div class="error">Page not found</div>`;
      return;
    }

    state.lang = fallbackLang;
    langBtn.textContent = fallbackLang.toUpperCase();
  }

  const raw = await res.text();
  const parsed = parseFrontMatter(raw);

  const pageObj = {
    id: pageId,
    meta: parsed.data,
    content: parsed.content
  };

  state.cache.set(cacheKey, pageObj);
  renderPage(pageObj);
}

// ===================== RESOLVE PAGE =====================

function resolvePage() {
  const route = getRoutePage();
  if (route) return route;

  if (state.pages.length > 0) {
    return state.pages[0].id;
  }

  return null;
}

// ===================== RENDER =====================

function renderPage(pageObj) {
  state.currentPage = pageObj;

  contentEl.innerHTML = marked.parse(pageObj.content || "");

  const blocks = contentEl.querySelectorAll("pre code");

  for (const block of blocks) {
    hljs.highlightElement(block);
  }
 
  customFormat(contentEl);

  renderNav();
}

// ===================== NAVIGATION =====================

function renderNav(list = state.pages) {
  navEl.innerHTML = "";

  for (const p of list) {
    const btn = document.createElement("button");

    btn.textContent = p.title || p.id;
    btn.classList.add("nav-item");

    btn.style.setProperty("--depth", (p.depth ?? 0) + 1);

    if (p.id === state.currentPageId) {
      btn.classList.add("active");
    }

    btn.onclick = () => {
      setRoute(p.id);
      loadMarkdown(p.id);
    };

    navEl.appendChild(btn);
  }
}

// ===================== LANGUAGE SWITCH =====================

async function toggleLanguage() {
  state.lang = state.lang === "ru" ? "en" : "ru";
  langBtn.textContent = state.lang.toUpperCase();
 
  await loadPages();
 
  renderNav();
 
  if (state.currentPageId) {
    loadMarkdown(state.currentPageId);
  }
}

// ===================== ROUTE LISTENER =====================

window.addEventListener("hashchange", () => {
  const page = resolvePage();
  window.scrollTo({ top: 0, behavior: "smooth" });
  loadMarkdown(page);
});

// ===================== INIT =====================

async function init() {
  await loadPages();

  const page = resolvePage();

  if (!page) {
    contentEl.innerHTML = `<div class="error">No pages found</div>`;
    return;
  }

  location.hash = page;

  await loadMarkdown(page);
  renderNav();
}

init();
