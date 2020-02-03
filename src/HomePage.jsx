import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage({ profileName, validate }) {
    const [detailsAreVisible, setDetailsAreVisible] = useState(false);
    const [profileData, setProfileData] = useState({});

    const { login, name, bio, avatar_url: avatar, public_repos: repos } = profileData;

    const toggleDetails = () => {
        setDetailsAreVisible(state => !state);
    };

    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://api.github.com/users/${profileName}`);
            const data = await res.json();

            setProfileData(data);
        }
        getData();
    }, [profileName]);

    return (
        <>
            <div>
                <label className="search">
                    Look for a Github profile:
                    <input type="text" onBlur={validate} placeholder="gaearon" />
                </label>
            </div>

            <button className="show-details-btn" onClick={toggleDetails}>
                Show {login} profile details
            </button>

            <Link to="/repos">Repos</Link>

            {profileName && detailsAreVisible && (
                <div className="profile-details">
                    <img src={avatar} width={150} height={150} />
                    <h3>{name}</h3>
                    <p>{bio}</p>
                    <p>repos: {repos}</p>
                </div>
            )}
        </>
    );
}

export default HomePage;
