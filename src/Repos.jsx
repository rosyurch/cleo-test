import React, { useState, useEffect } from 'react';

function Repos({ profileName }) {
    const [repos, setRepos] = useState([]);
    const [query, setQuery] = useState('');
    const [sortByStars, setSortByStars] = useState(false);

    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://api.github.com/users/${profileName}/repos`);
            const data = await res.json();

            setRepos(data);
            // console.log(data);
        }
        getData();
    }, []);

    return (
        <>
            <h1>Public repositories list</h1>
            <label>
                Search: <input type="text" onChange={e => setQuery(e.target.value.toLowerCase())} />
            </label>
            <label>
                <input type="checkbox" onChange={e => setSortByStars(e.target.checked)} />
                Sort by stars
            </label>

            <ul>
                {repos
                    .filter(r => r.name.toLowerCase().includes(query))
                    .sort((a, b) => (sortByStars ? b.stargazers_count - a.stargazers_count : 0))
                    .map(r => (
                        <li key={r.id}>{r.name}</li>
                    ))}
            </ul>
        </>
    );
}

export default Repos;
