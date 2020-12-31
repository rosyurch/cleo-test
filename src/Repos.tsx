import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./repos.css";
import { Repo } from "./types/repo";

function Repos({ repos }: { repos: Repo[] }) {
    const [query, setQuery] = useState("");
    const [sortByStars, setSortByStars] = useState(false);

    return (
        <>
            <h1 className="heading">Public repositories list</h1>
            <div className="search-wrap">
                <label>
                    Search:{" "}
                    <input
                        className="search-input"
                        type="text"
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}
                    />
                </label>
            </div>
            <div className="checkbox-wrap">
                <label className="check-label">
                    <input
                        className="check-input"
                        type="checkbox"
                        onChange={(e) => setSortByStars(e.target.checked)}
                    />
                    Sort by stars
                </label>
            </div>
            <ul className="list">
                {repos
                    .filter((r) => r.name.toLowerCase().includes(query))
                    .sort((a, b) =>
                        sortByStars
                            ? b.stargazers_count - a.stargazers_count
                            : 0
                    )
                    .map((repo) => (
                        <li key={repo.id} className="list-item">
                            <Link
                                className="repo-link"
                                to={{
                                    pathname: "/repo",
                                    search: `?id=${repo.id}`,
                                    state: repo,
                                }}
                            >
                                {repo.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default Repos;
