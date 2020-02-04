import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
        margin:0;
        padding:0;
        background-color: #222;
        color: #fff;
    }
`;

ReactDOM.render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById('root')
);
