import { useEffect, useState } from "react";

const GetInfo = ({ value }) => {
    const token = process.env.REACT_APP_GITHUB_TOKEN; // Use environment variable for the token
    const username = value;
    const url = `https://api.github.com/users/${username}/repos`;

    const [repos, setRepos] = useState([]);
    const [checkLimitrate, setCheckLimitrate] = useState(null);
    const [error, setError] = useState(null);

    const repoData = async () => {
        try {
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!res.ok) {
                throw new Error(`Error fetching repos: ${res.statusText}`);
            }

            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log("Error", err);
            setError(err.message);
        }
    };

    const checkLimit = async () => {
        const url = `https://api.github.com/rate_limit`;
        try {
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Error fetching rate limit: ${res.statusText}`);
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.log("Error ", err);
            setError(err.message);
        }
    };

    useEffect(() => {
        checkLimit().then(data => {
            console.log(data);
            setCheckLimitrate(data);
        });
        repoData().then(data => {
            console.log(data);
            setRepos(data);
        });
    }, [username]);

    return (
        <>
            <div className="container-box">
                {error && <div className="error">{error}</div>}
                <ul>
                    <li><b>REPOS</b></li>
                    {repos && repos.length > 0 && repos.map((repo, index) => {
                        const repoUrl = "https://github.com/"; // Base URL for GitHub repositories
                        let url = `${repoUrl}${repo.full_name}`; // Use full_name to get 'username/repo-name'
                        return <li key={index}> <a href={url} target="_blank" rel="noopener noreferrer">{repo.name}</a></li>
                    })}
                </ul>
                <ul>
                    <li>Limit : {checkLimitrate && checkLimitrate.rate ? checkLimitrate.rate.limit : 'N/A'}</li>
                    <li>Remaining : {checkLimitrate && checkLimitrate.rate ? checkLimitrate.rate.remaining : 'N/A'}</li>
                    <li>Reset : {checkLimitrate && checkLimitrate.rate ? checkLimitrate.rate.reset : 'N/A'}</li>
                </ul>
            </div>
        </>
    );
}

export default GetInfo;