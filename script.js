// ===================== STATE =====================

const state = {
  lang: "ru",
  pages: [],
  currentPageId: null,
  cache: new Map(),
  searchIndex: []
};

// ===================== ELEMENTS =====================

const navEl = document.getElementById("navigation");
const contentEl = document.getElementById("content");

const langBtn = document.getElementById("lang-btn");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search");
const projectName = document.getElementById("project-name");
history.scrollRestoration = "manual";

// ===================== THEME =====================

const sunIcon = `
<svg viewBox="0 0 24 24">
<path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21"/>
</svg>`;

const moonIcon = `
<svg viewBox="0 0 24 24">
<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>
</svg>`;



function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.theme = theme;

  if (themeToggle) {
    themeToggle.innerHTML =
      theme === "light"
        ? moonIcon
        : sunIcon;
  }
}

function getPreferredTheme() {
  return (
    localStorage.theme ||
    (
      matchMedia("(prefers-color-scheme:light)")
        .matches
        ? "light"
        : "dark"
    )
  );
}

function toggleTheme() {
  applyTheme(
    document.body.dataset.theme === "light"
      ? "dark"
      : "light"
  );
}

applyTheme(
  getPreferredTheme()
);

themeToggle?.addEventListener(
  "click",
  toggleTheme
);

projectName?.addEventListener(
  "click",
  () => {

    history.pushState(
      null,
      "",
      location.pathname
    );

    loadRoot();
  }
);

async function loadRoot() {

  const htmlRes =
    await fetch(
      `docs/root/${state.lang}.html`
    );

  if (!htmlRes.ok)
    return;

  const metaRes =
    await fetch(
      `docs/root/${state.lang}.json`
    );

  const html =
    await htmlRes.text();

  const meta =
    metaRes.ok
      ? await metaRes.json()
      : {};

  contentEl.innerHTML = html;

  const projectName =
    document.getElementById(
      "project-name"
    );

  if (projectName && meta.title) {
    projectName.textContent =
      meta.title ?? "Documentation";
  }

  state.currentPageId = "root";
}

async function updateProjectTitle() {
  const projectName =
    document.getElementById(
      "project-name"
    );

  if (!projectName)
    return;


  const res =
    await fetch(
      `docs/root/${state.lang}.json`
    );


  if (!res.ok) {
    projectName.textContent =
      "Documentation";

    return;
  }


  const meta =
    await res.json();


  projectName.textContent =
    meta.title || "Documentation";
}

// ===================== CALL OUTS =====================

const callouts = [
  {
    type: "note",
    words: [
      "Note:",
      "Примечание:",
      "Заметка:"
    ]
  },
  {
    type: "warning",
    words: [
      "Warning:",
      "Предупреждение:"
    ]
  },
  {
    type: "tip",
    words: [
      "Tip:",
      "Совет:",
      "Подсказка:"
    ]
  }
];

function customFormat(root) {

  root.querySelectorAll(
    "pre code"
  )
    .forEach(block => {

      let html = block.innerHTML;

      html = html.replace(
        /:([a-zA-Z_]\w*)(\()/g,
        ':<span class="custom-func1">$1</span>$2'
      );

      html = html.replace(
        /\.([a-zA-Z_]\w*)(\()/g,
        '.<span class="custom-func2">$1</span>$2'
      );

      block.innerHTML = html;
    });

  root.querySelectorAll(
    "blockquote"
  )
    .forEach(block => {

      const p = block.querySelector("p");

      if (!p)
        return;

      const text =
        p.innerHTML;

      for (const c of callouts) {
        for (const w of c.words) {

          if (text.startsWith(w)) {

            block.classList.add(
              c.type
            );

            p.innerHTML =
              text.replace(
                w,
                `<strong>${w}</strong>`
              );

            return;
          }
        }
      }
    });
}

// ===================== ROUTING =====================

function getRoute() {
  const hash =
    decodeURIComponent(
      location.hash.slice(1)
    );

  if (!hash)
    return {
      page: null,
      anchor: null
    };

  const parts =
    hash.split("/");

  return {
    page: parts[0],
    anchor:
      parts.length > 1
        ? parts.slice(1).join("/")
        : null
  };
}

function getPageMeta(id) {
  return state.searchIndex[id];
}

function setRoute(
  page,
  anchor = null
) {
  location.hash =
    anchor
      ? `${page}/${anchor}`
      : page;
}

function scrollToAnchor(anchor) {

  if (!anchor) {
    contentEl.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    return;
  }

  requestAnimationFrame(() => {

    const el =
      document.getElementById(anchor);

    if (el) {
      contentEl.scrollTo({
        top: el.offsetTop,
        behavior: "smooth"
      });
    }
  });
}

// ===================== LOAD DATA =====================

async function loadPages() {
  state.pages =
    await fetch(
      "docs/pages.json"
    ).then(r => r.json());

  state.pages =
    state.pages.map(item => {

      if (item === "---") {
        return {
          type: "separator"
        };
      }

      if (item.startsWith("#")) {
        return {
          type: "header",
          title: item.slice(1)
        };
      }

      const meta = getPageMeta(item);

      return {
        type: "page",

        id: item,

        title:
          meta?.title[state.lang]
          ||
          item,

        depth:
          meta?.depth
          ??
          0
      };

    });

}

async function loadSearch() {
  const data =
    await fetch(
      "docs/search.json"
    ).then(r => r.json());

  state.searchIndex =
    Object.fromEntries(
      data.map(
        x => [
          x.id,
          x
        ]
      )
    );
}

// ===================== SEARCH =====================

function searchPages(query) {

  if (!query)
    return state.pages;

  query = query.toLowerCase();

  return state.searchIndex
    .filter(p => {

      return (
        p.title.ru
          .toLowerCase()
          .includes(query)
        ||
        p.title.en
          .toLowerCase()
          .includes(query)
        ||
        p.tags.some(
          t =>
            t.toLowerCase()
              .includes(query)
        )
      );
    })
    .map(p => ({
      type: "page",
      id: p.id,
      title: p.title[state.lang]
    }));
}

// ===================== NAV =====================

function renderNav(list = state.pages) {

  navEl.innerHTML = "";

  for (const p of list) {

    if (p.type === "separator") {
      const div =
        document.createElement(
          "div"
        );
      div.className = "nav-separator";
      navEl.append(div);

      continue;
    }

    if (p.type === "header") {

      const div =
        document.createElement(
          "div"
        );

      div.className = "nav-header";
      div.textContent = p.title;
      navEl.append(div);

      continue;
    }

    const btn =
      document.createElement(
        "button"
      );

    btn.className = "nav-item";
    btn.textContent = p.title || p.id;
    btn.style.setProperty(
      "--depth",
      p.depth ?? 0
    );

    if (p.id === state.currentPageId)
      btn.classList.add(
        "active"
      );

    btn.onclick = () => {
      setRoute(
        p.id
      );
    };

    navEl.append(btn);

  }
}

// ===================== LOAD HTML =====================

async function loadPage(id) {

  state.currentPageId = id;

  const key = `${id}:${state.lang}`;
  let html = state.cache.get(key);

  if (!html) {

    let res =
      await fetch(
        `docs/${id}/${state.lang}.html`
      );

    if (!res.ok) {
      const fallback =
        state.lang === "ru"
          ? "en"
          : "ru";

      res =
        await fetch(
          `docs/${id}/${fallback}.html`
        );
    }

    html = await res.text();
    state.cache.set(key, html);
  }

  contentEl.innerHTML = html;

  customFormat(contentEl);
  setupLinks();
  renderNav();
}

// ===================== INTERNAL LINKS =====================

function setupLinks() {

  contentEl
    .querySelectorAll("a")
    .forEach(link => {

      const href = link.getAttribute("href");

      if (
        !href ||
        !href.startsWith("#")
      )
        return;

      link.onclick = e => {

        e.preventDefault();

        const route =
          href.slice(1)
            .split("/");

        setRoute(
          route[0],
          route.slice(1).join("/")
          ||
          null
        );
      };
    });
}

// ===================== HASH =====================

window.addEventListener(
  "hashchange",
  async () => {

    const route = getRoute();

    if (route.page) {
      await loadPage(
        route.page
      );

      scrollToAnchor(
        route.anchor
      );
    }
  });

// ===================== LANGUAGE =====================

async function toggleLanguage() {
  state.lang =
    state.lang === "ru"
      ? "en"
      : "ru";

  langBtn.textContent = state.lang.toUpperCase();

  updatePageTitles();
  await updateProjectTitle();
  renderNav();

  state.cache.clear();

  if (state.currentPageId === "root") {
    loadRoot();
  }
  else if (state.currentPageId) {
    await loadPage(
      state.currentPageId
    );
  }
}

langBtn?.addEventListener(
  "click",
  toggleLanguage
);

function updatePageTitles() {
  state.pages.forEach(page => {
    if (page.type !== "page")
      return;

    const meta = state.searchIndex[page.id];

    if (meta) {
      page.title =
        meta.title[state.lang]
        ??
        meta.title.ru
        ??
        page.id;
    }
  });
}

// ===================== SEARCH =====================

searchInput?.addEventListener(
  "input",
  e => {

    renderNav(
      searchPages(
        e.target.value
      )
    );
  });

// ===================== INIT =====================

async function init() {

  await loadSearch();
  await loadPages();
  await updateProjectTitle();

  renderNav();

  const route = getRoute();


  // главная страница
  if (!route.page) {

    await loadRoot();

    return;
  }


  await loadPage(
    route.page
  );


  scrollToAnchor(
    route.anchor
  );
}

init();