import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomePage from './HomePage';
import Repos from './Repos';

import './App.css';

function App() {
    const [profileName, setProfileName] = useState('gaearon');

    const getValidProfileName = e => {
        const input = e.target.value.trim();
        const regex = /^[a-zA-Z0-9-]+$/;

        if (regex.test(input)) {
            setProfileName(input);
        }
    };

    return (
        <div className="App">
            <Router>
                <Route exact path="/">
                    <HomePage profileName={profileName} validate={getValidProfileName} />
                </Route>
                <Route path="/repos">
                    <Repos profileName={profileName} />
                </Route>
            </Router>
        </div>
    );
}

export default App;
