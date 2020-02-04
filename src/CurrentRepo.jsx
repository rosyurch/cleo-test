import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const A = styled.a`
    text-decoration: none;
`;

const H1 = styled.h1`
    text-align: center;
    color: #2fd;
    font-size: 3.5em;
    padding: 10px;
`;

const P = styled.p`
    text-align: center;
    margin-bottom: 15px;
`;

const Desc = styled.p`
    text-align: center;
    margin: auto;
    margin-bottom: 15px;
    position: relative;
    width: max-content;

    &:before {
        content: '';
        position: absolute;
        left: -20px;
        width: 10px;
        height: 100%;
        background: linear-gradient(to right, #222, #fff);
    }
`;

function CurrentRepo(props) {
    const repos = props.repos;
    const query = new URLSearchParams(props.location.search);

    const id = Number(query.get('id'));

    const repo = repos.filter(r => r.id === id)[0] || []; // filter returns single elem array, initially undefined

    return (
        <>
            <A href={repo.html_url}>
                <H1>{repo.name}</H1>
            </A>
            <P>
                {repo.stargazers_count}
                <span role="img" aria-label="stars">
                    &#127775;
                </span>
            </P>
            <Desc>{repo.description}</Desc>
            <P>Issues: {repo.open_issues}</P>
        </>
    );
}

export default withRouter(CurrentRepo);
