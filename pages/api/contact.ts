import { NextApiRequest, NextApiResponse } from "next";
import { initOctokit } from "../../utils/github";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(404).send('');
    }

    let data;

    try {
        data = JSON.parse(req.body).data;

        if (!data.email || !data.message) throw new Error("Invalid body shape");
    } catch(e) {
        console.log(e);
        return res.status(404).send('');
    }

    try {
        const octokit = initOctokit();

        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: 'Walrussuit101',
            repo: 'next-portfolio',
            title: data.email,
            body: data.message,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return res.status(200).send('');
    } catch(e) {
        console.log(e);
        return res.status(404).send('');
    }
}

export default handler;