import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Repos from './Repos';
import CurrentRepo from './CurrentRepo';

function App() {
    const [profileName, setProfileName] = useState('');
    const [repos, setRepos] = useState([]);

    const getValidProfileName = name => {
        const input = name.trim();
        const regex = /^[a-zA-Z0-9-]+$/;

        if (regex.test(input)) {
            setProfileName(input);
        }
    };

    useEffect(() => {
        async function getData() {
            const res = await fetch(`https://api.github.com/users/${profileName}/repos`);
            const data = await res.json();

            setRepos(data);
        }
        getData();
    }, [profileName]);

    return (
        <>
            <div className="App">
                <Router basename={process.env.PUBLIC_URL}>
                    <Route exact path="/">
                        <HomePage profileName={profileName} validate={getValidProfileName} />
                    </Route>

                    <Route exact path="/repos/">
                        <Repos repos={repos} />
                    </Route>

                    <Route path="/repo/">
                        <CurrentRepo repos={repos} />
                    </Route>
                </Router>
            </div>
        </>
    );
}

export default App;
