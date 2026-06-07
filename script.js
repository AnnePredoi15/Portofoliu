const GITHUB_USER = 'AnnePredoi15';
const PER_PAGE = 6;

let allRepos = [];
let filtered = [];
let displayed = 0;
let activeLang = 'Toate';

const grid = document.getElementById('repos-grid');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error-msg');
const loadMoreBtn = document.getElementById('load-more-btn');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const langFilters = document.getElementById('lang-filters');

async function fetchRepos() {
  loading.classList.remove('hidden');
  errorMsg.classList.add('hidden');
  grid.innerHTML = '';

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();

    // Excludem fork-urile (cerinta nota 8-9)
    allRepos = data.filter(r => !r.fork);

    if (allRepos.length === 0) {
      allRepos = getFallbackRepos();
    }

    buildLangFilters();
    applyFiltersAndRender();
  } catch (err) {
    console.error(err);
    // Daca API-ul pica, afisam proiecte hardcodate
    allRepos = getFallbackRepos();
    buildLangFilters();
    applyFiltersAndRender();
    errorMsg.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
}

function getFallbackRepos() {
  return [
    {
      name: "Nu-te-supara-frate",
      description: "Joc de board 'Nu te supăra, frate!' implementat în C# cu Windows Forms, OOP și animații.",
      language: "C#",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AnnePredoi15",
      updated_at: "2025-01-01T00:00:00Z"
    },
    {
      name: "Proiecte-CPP",
      description: "Colecție de proiecte și exerciții în C++ din cadrul cursurilor universitare.",
      language: "C++",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AnnePredoi15",
      updated_at: "2024-12-01T00:00:00Z"
    },
    {
      name: "Java-Apps",
      description: "Aplicații Java realizate la laborator – algoritmi, structuri de date, interfețe.",
      language: "Java",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AnnePredoi15",
      updated_at: "2024-11-01T00:00:00Z"
    },
    {
      name: "Python-Scripts",
      description: "Scripturi Python pentru automatizare și rezolvare de probleme.",
      language: "Python",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AnnePredoi15",
      updated_at: "2024-10-01T00:00:00Z"
    },
    {
      name: "Web-Portofoliu",
      description: "Pagina personală de portofoliu cu integrare GitHub API.",
      language: "HTML",
      stargazers_count: 0,
      forks_count: 0,
      html_url: "https://github.com/AnnePredoi15",
      updated_at: "2025-06-01T00:00:00Z"
    }
  ];
}

function buildLangFilters() {
  const langs = ['Toate', ...new Set(allRepos.map(r => r.language).filter(Boolean))];
  langFilters.innerHTML = '';
  langs.forEach(lang => {
    const btn = document.createElement('button');
    btn.className = 'lang-btn' + (lang === activeLang ? ' active' : '');
    btn.textContent = lang;
    btn.addEventListener('click', () => {
      activeLang = lang;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFiltersAndRender();
    });
    langFilters.appendChild(btn);
  });
}

function applyFiltersAndRender() {
  const query = searchInput.value.toLowerCase().trim();
  const sort = sortSelect.value;

  filtered = allRepos.filter(r => {
    const matchLang = activeLang === 'Toate' || r.language === activeLang;
    const matchSearch =
      r.name.toLowerCase().includes(query) ||
      (r.description || '').toLowerCase().includes(query);
    return matchLang && matchSearch;
  });

  // Sortare
  filtered.sort((a, b) => {
    if (sort === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  displayed = 0;
  grid.innerHTML = '';
  showNextBatch();
}

function showNextBatch() {
  const batch = filtered.slice(displayed, displayed + PER_PAGE);
  batch.forEach(repo => grid.appendChild(createCard(repo)));
  displayed += batch.length;

  if (displayed < filtered.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:#888; font-size:.9rem;">Niciun proiect găsit.</p>';
  }
}

function createCard(repo) {
  const card = document.createElement('div');
  card.className = 'repo-card';

  const desc = repo.description || ' ';
  const lang = repo.language ? `<span class="repo-lang">${repo.language}</span>` : '';
  const updated = new Date(repo.updated_at).toLocaleDateString('ro-RO', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  card.innerHTML = `
    <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
    <p class="repo-desc">${desc}</p>
    <div class="repo-meta">
      ${lang}
      <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
      <span class="repo-stat">🍴 ${repo.forks_count}</span>
      <span class="repo-stat" style="margin-left:auto; font-size:.75rem;">${updated}</span>
    </div>
    <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noopener">Vezi pe GitHub →</a>
  `;
  return card;
}

searchInput.addEventListener('input', applyFiltersAndRender);
sortSelect.addEventListener('change', applyFiltersAndRender);
loadMoreBtn.addEventListener('click', showNextBatch);

fetchRepos();