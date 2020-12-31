import React from "react";
import { useLocation } from "react-router-dom";
import { Repo } from "./types/repo";

function CurrentRepo({ repos }: { repos: Repo[] }) {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const id = Number(query.get("id"));

    const repo = repos.filter((r) => r.id === id)[0] || []; // filter returns single elem array, initially undefined

    return (
        <>
            <a href={repo.html_url}>
                <h1 className="repo-heading">{repo.name}</h1>
            </a>
            <p className="stars">
                {repo.stargazers_count}
                <span role="img" aria-label="stars">
                    &#127775;
                </span>
            </p>
            <p className="description">{repo.description}</p>
            <p className="stars">Issues: {repo.open_issues}</p>
        </>
    );
}

export default CurrentRepo;
