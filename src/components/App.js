import React from 'react';
import Header from './elements/Header';
import Home from './Home';
import { createGlobalStyle } from 'styled-components';
import { Router } from '@reach/router';
import Movie from './Movie';
import NotFound from './NotFound';



const GlobalStyle = createGlobalStyle `
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`

const App = () => (
    <>
        <GlobalStyle />
        <Header />
        <Router>
            <Home path="/" />
            <Movie path="/:movieId" />
            <NotFound default />

        </Router>
        
        
    </>
) ;

export default App;
