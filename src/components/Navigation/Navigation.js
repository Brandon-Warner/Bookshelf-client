import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import './Navigation.css';
import Hamburger from '../Hamburger/Hamburger';

const Navigation = ({ token, setPage, logout }) => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    console.log('hamburgerOpen: ', hamburgerOpen);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <Nav>
            <ButtonsList hamburgerOpen={hamburgerOpen} className='navigation'>
                <li>
                    <button className='btn' onClick={() => setPage('landingPage')}>
                        home
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => setPage('authors')}>
                        authors
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => setPage('books')}>
                        books
                    </button>
                </li>
                {token === null ? (
                    <button className='btn' onClick={() => setPage('login')}>
                        login
                    </button>
                ) : (
                    <li>
                        <button className='btn' onClick={() => setPage('add')}>
                            add book
                        </button>
                    </li>
                )}

                {token === null ? null : (
                    <li>
                        <button className='btn' onClick={() => setPage('recommend')}>
                            recommend
                        </button>
                    </li>
                )}

                {token === null ? (
                    <li>
                        <button className='btn' onClick={() => setPage('newUser')}>
                            new user
                        </button>
                    </li>
                ) : null}

                {token === null ? null : (
                    <li>
                        <button className='btn' onClick={logout}>
                            logout
                        </button>
                    </li>
                )}
            </ButtonsList>
            <div className='hamburger' onClick={toggleHamburger}>
                <Hamburger hamburgerOpen={hamburgerOpen} />
            </div>
        </Nav>
    );
};

const slideIn = keyframes`
from {
    transform: translateX(-100%);
    opacity: 0;
}
to {
    transform: translateX(0);
    opacity: 1;
}
`;

const slideOut = keyframes`
from {
    transform: translateX(100%);
    opacity: 1;
}
to {
    transform: translateX(0);
    opacity: 0;
}
`;

const animationEnter = css`
    ${slideIn} 300ms cubic-bezier(0.5, 0, 0.5, 1)
`;

const animationExit = css`
    ${slideOut} 300ms cubic-bezier(0.5, 0, 0.5, 1)
`;

const Nav = styled.nav`
    background: linear-gradient(180deg, black, rgba(0, 0, 0, 0));
    opacity: 1;
    height: 60px;
    margin-bottom: 10px;
`;

const ButtonsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    float: right;
    padding: 0 25px;

    @media (max-width: 1185px) {
        display: ${props => (props.hamburgerOpen ? 'inline' : 'none')};
        background-color: black;
        text-align: center;
        color: #eee;
        height: 100vw;
        width: 50vw;
        position: fixed;
        z-index: 10;
        animation: ${props =>
            props.hamburgerOpen
                ? css`
                      ${animationEnter}
                  `
                : css`
                      ${animationExit}
                  `};
`;

export default Navigation;
