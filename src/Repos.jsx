import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Heading = styled.h1`
    text-align: center;
    margin: 15px 0;
`;

const SearchWrap = styled.div`
    text-align: center;
`;

const SearchInput = styled.input`
    margin-bottom: 10px;
    border-radius: 15px;
    padding: 10px;
    border: 1px solid #eee;
`;

const CheckboxWrap = styled.div`
    text-align: center;
`;

const CheckLabel = styled.label`
    position: relative;
`;

const CheckInput = styled.input`
    position: absolute;
    left: -22px;
    top: -1px;
    &:active,
    :focus {
        outline: 1px solid #222; /*visually hides the outline*/
    }
`;

const Ul = styled.ul`
    list-style-type: none;
    margin: 20px;
    margin-left: 50px;

    /* horizontal list */
    /* display: flex;
    flex-wrap: wrap;        
    justify-content: space-evenly; */
`;

const Li = styled.li`
    margin: 20px;
    font-size: 1.2em;
`;

const StLink = styled(Link)`
    text-decoration: none;
    &:hover,
    :active {
        color: #2fd;
        text-decoration: underline;
    }
`;

function Repos({ repos }) {
    const [query, setQuery] = useState('');
    const [sortByStars, setSortByStars] = useState(false);

    return (
        <>
            <Heading>Public repositories list</Heading>
            <SearchWrap>
                <label>
                    Search: <SearchInput type="text" onChange={e => setQuery(e.target.value.toLowerCase())} />
                </label>
            </SearchWrap>
            <CheckboxWrap>
                <CheckLabel>
                    <CheckInput type="checkbox" onChange={e => setSortByStars(e.target.checked)} />
                    Sort by stars
                </CheckLabel>
            </CheckboxWrap>
            <Ul>
                {repos
                    .filter(r => r.name.toLowerCase().includes(query))
                    .sort((a, b) => (sortByStars ? b.stargazers_count - a.stargazers_count : 0))
                    .map(repo => (
                        <Li key={repo.id}>
                            <StLink to={{ pathname: '/repo', search: `?id=${repo.id}`, state: repo }}>{repo.name}</StLink>
                        </Li>
                    ))}
            </Ul>
        </>
    );
}

export default Repos;
