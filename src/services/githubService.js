import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_USERNAME = 'pedrolcsf';
const GITHUB_API_TOKEN = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;

export const fetchGitHubReposFav = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : undefined,
      },
      params: {
        affiliation: 'owner,collaborator',
        sort: 'updated',
        per_page: 100,
      },
      timeout: 10000,
    });

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    const favoriteRepos = response.data.filter((repo) => repo.stargazers_count > 0);
    return favoriteRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching GitHub repositories:', error);
    }
    return [];
  }
};

export const fetchGitHubRepos = async () => {
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
      headers: {
        Authorization: GITHUB_API_TOKEN ? `Bearer ${GITHUB_API_TOKEN}` : undefined,
      },
      params: {
        sort: 'updated',
        per_page: 100,
      },
      timeout: 10000,
    });

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    return response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching GitHub repositories:', error);
    }
    return [];
  }
};
