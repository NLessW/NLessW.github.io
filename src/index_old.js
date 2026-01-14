// ==========================================
//  ⚠️ CONFIGURATION AREA
// ==========================================
const USERNAME = 'NLessW';
// 여기에 GitHub Token을 입력하세요 (ex: ghp_xxxxxxxx...)
const GITHUB_TOKEN = ''; // Token removed for security
// ==========================================

const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width,
    height,
    particles = [];
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 255, 157, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
for (let i = 0; i < 40; i++) particles.push(new Particle());
function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

const phrases = ['Firmware Developer', 'Full-Stack Developer', 'IoT Enthusiast'];
let pIdx = 0,
    cIdx = 0,
    isDel = false;
const typeEl = document.getElementById('typewriter');
function type() {
    const cur = phrases[pIdx];
    typeEl.textContent = cur.substring(0, isDel ? cIdx-- : cIdx++);
    if (!isDel && cIdx === cur.length + 1) {
        isDel = true;
        setTimeout(type, 2000);
    } else if (isDel && cIdx === 0) {
        isDel = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(type, 500);
    } else setTimeout(type, isDel ? 50 : 100);
}
document.addEventListener('DOMContentLoaded', type);

const langColors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    'JS/TS': '#EAB308',
    Python: '#3572A5',
    'C++': '#f34b7d',
    C: '#555555',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Vue: '#41b883',
    Shell: '#89e051',
    Arduino: '#00979D',
    Java: '#b07219',
    Go: '#00ADD8',
    Ruby: '#701516',
    Swift: '#ffac45',
};

// GitHub Logic
async function fetchGitHubData() {
    const headers = { Accept: 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    try {
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
            headers,
        });
        if (!res.ok) throw new Error(res.status === 403 ? 'Rate Limit' : 'Network Error');

        let repos = await res.json();
        repos = repos.filter((r) => !r.fork);

        const statusEl = document.getElementById('connection-status');
        statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-neon animate-pulse"></span> Connected (${USERNAME})`;
        statusEl.classList.replace('text-slate-400', 'text-neon');
        document.getElementById('total-repo-count').innerText = `${repos.length} Public Projects`;

        const repoPromises = repos.map(async (repo) => {
            try {
                const langRes = await fetch(repo.languages_url, { headers });
                return { ...repo, languageStats: await langRes.json() };
            } catch {
                return { ...repo, languageStats: {} };
            }
        });

        const detailedRepos = await Promise.all(repoPromises);
        processGlobalStats(detailedRepos);
        renderProjects(detailedRepos);
    } catch (error) {
        console.error(error);
        const msg = GITHUB_TOKEN ? 'Token Invalid or Expired' : 'API Rate Limit Reached';
        document.getElementById(
            'project-grid'
        ).innerHTML = `<div class="col-span-full text-center text-red-400 border border-red-900 p-8 rounded bg-red-900/10">${msg}</div>`;
    }
}

function processGlobalStats(repos) {
    let globalBytes = {};
    let totalBytes = 0;
    repos.forEach((repo) => {
        for (const [lang, bytes] of Object.entries(repo.languageStats)) {
            globalBytes[lang] = (globalBytes[lang] || 0) + bytes;
            totalBytes += bytes;
        }
    });
    const sorted = Object.entries(globalBytes)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 6);
    const container = document.getElementById('lang-chart-container');
    container.innerHTML = '';

    sorted.forEach(([lang, bytes]) => {
        const percent = ((bytes / totalBytes) * 100).toFixed(1);
        const color = langColors[lang] || '#94a3b8';
        container.innerHTML += `
                    <div class="mb-4">
                        <div class="flex justify-between text-sm mb-1">
                            <span class="text-white font-bold">${lang}</span>
                            <span class="text-slate-400 font-mono">${percent}%</span>
                        </div>
                        <div class="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-1000" style="width: 0%; background-color: ${color}" data-width="${percent}%"></div>
                        </div>
                    </div>`;
    });
    setTimeout(
        () =>
            document.querySelectorAll('[data-width]').forEach((el) => (el.style.width = el.getAttribute('data-width'))),
        100
    );
}

function renderProjects(repos) {
    const grid = document.getElementById('project-grid');
    const filterContainer = document.getElementById('category-filters');

    filterContainer.innerHTML =
        '<button class="filter-btn active px-3 py-1 text-sm rounded text-white bg-slate-700 transition-all font-mono border border-transparent whitespace-nowrap" data-filter="all">All</button>';
    grid.innerHTML = '';

    const langCounts = {};
    repos.forEach((r) => {
        let lang = r.language;
        if (!lang) return;
        if (lang === 'JavaScript' || lang === 'TypeScript') lang = 'JS/TS';
        langCounts[lang] = (langCounts[lang] || 0) + 1;
    });
    const sortedLangs = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a]);

    sortedLangs.forEach((lang) => {
        const btn = document.createElement('button');
        btn.className =
            'filter-btn px-3 py-1 text-sm rounded text-slate-400 hover:text-white transition-all font-mono border border-transparent hover:border-slate-600 whitespace-nowrap';
        btn.textContent = `${lang} (${langCounts[lang]})`;
        btn.dataset.filter = lang;
        btn.onclick = (e) => handleFilter(e, lang, repos);
        filterContainer.appendChild(btn);
    });
    filterContainer.querySelector('[data-filter="all"]').onclick = (e) => handleFilter(e, 'all', repos);
    displayRepos(repos);
}

function displayRepos(repos) {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '';
    if (repos.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-slate-500 py-10">No projects found.</div>';
        return;
    }

    repos.forEach((repo) => {
        const stats = repo.languageStats || {};
        const total = Object.values(stats).reduce((a, b) => a + b, 0);
        const sortedStats = Object.entries(stats)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4);

        let barHtml = '<div class="stacked-bar h-2 bg-slate-800 mt-4 flex overflow-hidden rounded-full">';
        let legendHtml = '<div class="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] font-mono text-slate-400">';

        if (total > 0) {
            sortedStats.forEach(([lang, bytes]) => {
                const pct = ((bytes / total) * 100).toFixed(1);
                const color = langColors[lang] || '#64748b';
                barHtml += `<div class="stacked-segment" style="width: ${pct}%; background-color: ${color}"></div>`;
                legendHtml += `<div class="flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full" style="background-color: ${color}"></span>${lang} ${Math.round(
                    pct
                )}%</div>`;
            });
        } else {
            barHtml += `<div class="w-full h-full bg-slate-700"></div>`;
            legendHtml += `<span>No language data</span>`;
        }
        barHtml += '</div></div>';

        const card = `
                    <a href="${repo.html_url}" target="_blank" class="group relative block h-full">
                        <div class="h-full bg-card border border-slate-800 rounded-xl p-6 hover:border-neon transition-all duration-300 flex flex-col shadow-lg">
                            <div class="flex justify-between items-start mb-4">
                                <div class="text-neon text-2xl"><i class="fa-regular fa-folder-open"></i></div>
                                <div class="text-slate-500 text-xs font-mono"><i class="fa-regular fa-clock mr-1"></i>${
                                    new Date(repo.updated_at).toISOString().split('T')[0]
                                }</div>
                            </div>
                            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-neon transition line-clamp-1">${
                                repo.name
                            }</h3>
                            <p class="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow h-10">${
                                repo.description || 'No description provided.'
                            }</p>
                            <div class="mt-auto pt-4 border-t border-slate-700/50">${barHtml}${legendHtml}</div>
                        </div>
                    </a>`;
        grid.innerHTML += card;
    });
}

function handleFilter(e, filter, allRepos) {
    document.querySelectorAll('.filter-btn').forEach((b) => {
        b.classList.remove('bg-slate-700', 'text-white', 'active');
        b.classList.add('text-slate-400');
    });
    e.target.classList.add('bg-slate-700', 'text-white', 'active');
    e.target.classList.remove('text-slate-400');

    let filtered;
    if (filter === 'all') {
        filtered = allRepos;
    } else if (filter === 'JS/TS') {
        filtered = allRepos.filter((r) => r.language === 'JavaScript' || r.language === 'TypeScript');
    } else {
        filtered = allRepos.filter((r) => r.language === filter);
    }
    displayRepos(filtered);
}

// --- Terminal Logic Restored ---
const termOverlay = document.getElementById('terminal-overlay');
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');

function toggleTerminal() {
    if (termOverlay.classList.contains('hidden')) {
        // Open
        termOverlay.classList.remove('hidden');
        setTimeout(() => termOverlay.classList.add('active'), 10);
        termInput.focus();
    } else {
        // Close
        termOverlay.classList.remove('active');
        setTimeout(() => termOverlay.classList.add('hidden'), 300);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        toggleTerminal();
    }
    if (e.key === 'Escape') {
        termOverlay.classList.remove('active');
        setTimeout(() => termOverlay.classList.add('hidden'), 300);
    }
});

termInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const val = this.value.trim().toLowerCase();
        termBody.innerHTML += `<div class="mb-1"><span class="text-neon">➜</span> <span class="text-white">${this.value}</span></div>`;

        let out = '';
        if (val === 'help') out = 'Commands: <span class="text-yellow-400">about, skills, projects, clear, exit</span>';
        else if (val === 'about')
            out =
                'Full-stack & Embedded Developer @ NLessW\nName : Kim WooHyeok\nEmail : qkqkhih@rehan.ai.kr\nBirth : 2000.04.03\nSex : Male\nLocation : Republic of Korea, Incheon\nGitHub : https://github.com/NLessW';
        else if (val === 'skills')
            out =
                'My Skills:\n- Programming: C, C++, Python, JavaScript, TypeScript, HTML, CSS, React\n- Embedded Systems: Arduino\n- Web Development: Node.js, Express, MongoDB, Tailwind CSS\n- Tools: Git, VSCode';
        else if (val === 'projects') {
            out = 'Scrolling to projects...';
            window.location.href = '#projects';
            toggleTerminal();
        } else if (val === 'clear') {
            termBody.innerHTML = '';
            this.value = '';
            return;
        } else if (val === 'exit') toggleTerminal();
        else out = `<span class="text-red-400">Command not found: ${val}</span>`;

        if (out) termBody.innerHTML += `<div class="pl-4 text-slate-400 mb-2">${out.replace(/\n/g, '<br>')}</div>`;

        this.value = '';
        termBody.scrollTop = termBody.scrollHeight;
    }
});

// Init
fetchGitHubData();
