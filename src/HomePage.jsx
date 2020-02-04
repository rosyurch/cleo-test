import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    margin: 10px 0;
    width: max-content;
    font-size: 1.2em;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #eee;

    &:focus {
        transform: skew(-10deg);
    }
    transition: all 0.5s ease-in-out;
`;

const Button = styled.button`
    margin: 10px;
    border: 1px solid #eee;
    padding: 10px 25px;
    cursor: pointer;

    &:hover,
    &:active {
        background-color: #eee;
        color: #000;
        transform: skew(-10deg);
    }
    transition: all 0.5s ease-in-out;
`;

const StLink = styled(Link)`
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid #2fd;
    color: #2fd;

    &:hover,
    &:active {
        background-color: #eee;
        color: #000;
        transform: skew(-10deg);
    }
    transition: all 0.5s ease-in-out;
`;

const Controls = styled.div`
    margin: 0 auto;
    max-width: 60%;
    text-align: center;
`;

const Profile = styled.div`
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 630px) {
        flex-direction: column;
        text-align: center;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 15px;
`;

const Img = styled.img`
    border-radius: 15px;
    margin: 0 10px;
    @media (max-width: 630px) {
        margin: 15px auto;
    }
`;

const Name = styled.h3`
    font-size: 2.5em;
    @media (max-width: 630px) {
        margin-bottom: 15px;
    }
`;

const Bio = styled.p`
    @media (max-width: 630px) {
        margin-bottom: 15px;
    }
`;

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
            <Form onSubmit={e => e.preventDefault()}>
                <Label htmlFor="profile" className="search">
                    Look for a Github profile:
                </Label>
                <Input name="profile" type="text" onBlur={validate} placeholder="gaearon, etc..." />
            </Form>
            <Controls>
                <Button className="show-details-btn" onClick={toggleDetails}>
                    Show {login} profile details
                </Button>

                <StLink to="/repos">Repos</StLink>
            </Controls>

            {profileName && detailsAreVisible && (
                <Profile className="profile-details">
                    <Img className="profile-photo" src={avatar} width={250} height={250} alt="user avatar" />
                    <Info className="profile-info">
                        <Name>{name}</Name>
                        <Bio>{bio}</Bio>
                        <p>Repositories: {repos}</p>
                    </Info>
                </Profile>
            )}
        </>
    );
}

export default HomePage;
