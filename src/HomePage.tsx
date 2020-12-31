import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

type HomePageProps = {
    profileName: string;
    validate: (name: string) => void;
};

const defaultProfile = {
    login: "",
    name: "",
    bio: "",
    avatar_url: "",
    public_repos: 0,
};

function HomePage({ profileName, validate }: HomePageProps) {
    const [profileData, setProfileData] = useState<typeof defaultProfile>(
        defaultProfile
    );
    const [inputName, setInputName] = useState("");

    const {
        login,
        name,
        bio,
        avatar_url: avatar,
        public_repos: repos,
    } = profileData;

    useEffect(() => {
        async function getData() {
            const res = await fetch(
                `https://api.github.com/users/${profileName}`
            );
            const data = await res.json();
            setProfileData(data);
        }
        getData();
    }, [profileName]);

    return (
        <>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <label className="label search" htmlFor="profile">
                    Look for a Github profile:
                </label>

                <input
                    className="input"
                    name="profile"
                    type="text"
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="gaearon, etc..."
                />

                <button className="button" onClick={(e) => validate(inputName)}>
                    Fetch
                </button>
            </form>
            <div className="controls">
                <Link to="/repos" className="link">
                    Repos
                </Link>
            </div>

            {profileName && (
                <div className="profile profile-details">
                    <img
                        className="img profile-photo"
                        src={avatar}
                        width={250}
                        height={250}
                        alt="user avatar"
                    />
                    <div className="profile-info info">
                        <h3 className="name">{name}</h3>
                        <p>Username: {login}</p>
                        <p className="bio">{bio}</p>
                        <p>Repositories: {repos}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomePage;
