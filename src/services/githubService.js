import axios from 'axios';

const GITHUB_USERNAME = 'pedrolcsf';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const fetchGitHubReposFav = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      params: {
        affiliation: 'owner,collaborator',
      },
    });

    const favoriteRepos = response.data.filter((repo) => repo.stargazers_count > 0);
    return favoriteRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    return [];
  }
};

export const fetchGitHubRepos = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    return response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    return [];
  }
};
