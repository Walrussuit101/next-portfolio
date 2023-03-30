import { Octokit } from "octokit"

export const initOctokit = () => {
    const token = process.env.GITHUB_TOKEN;

    if (!token) throw new Error('GITHUB_TOKEN not set');

    return new Octokit({
        auth: token
    });
}