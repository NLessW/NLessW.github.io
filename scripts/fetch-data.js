import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'NLessW';
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

async function fetchGitHubData() {
    console.log(`Starting data fetch for user: ${USERNAME}...`);

    const headers = { Accept: 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) {
        console.log('Using GitHub Token for authentication.');
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    } else {
        console.warn('Warning: No VITE_GITHUB_TOKEN found in .env. Rate limits may apply.');
    }

    try {
        // 1. Fetch Repositories
        const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`, {
            headers,
        });
        if (!res.ok) throw new Error(`GitHub API Error: ${res.status} ${res.statusText}`);

        let data = await res.json();
        data = data.filter((r) => !r.fork);
        console.log(`Found ${data.length} non-forked repositories.`);

        // 2. Fetch Language Stats for each repo
        console.log('Fetching language statistics...');
        const repoPromises = data.map(async (repo) => {
            try {
                const langRes = await fetch(repo.languages_url, { headers });
                const languageStats = await langRes.json();
                return { ...repo, languageStats };
            } catch (e) {
                console.error(`Failed to fetch languages for ${repo.name}`);
                return { ...repo, languageStats: {} };
            }
        });

        const detailedRepos = await Promise.all(repoPromises);

        // 3. Save to file
        const outputPath = path.join(__dirname, 'src', 'data', 'repos.json');

        // Ensure directory exists
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(detailedRepos, null, 2));
        console.log(`Successfully saved data to ${outputPath}`);
    } catch (error) {
        console.error('Error fetching data:', error);
        process.exit(1);
    }
}

fetchGitHubData();
