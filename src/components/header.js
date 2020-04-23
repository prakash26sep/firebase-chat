import React from 'react';
//import logo from './logo.svg';
// import './App.css';
import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
        header: {
            display: 'flex',
            width: '100%',
            height: '60px',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
            color: 'white',
            backgroundColor: 'black'

        },
    },

}));

function Header() {

    style();

    return (
        <React.Fragment>

            <header>

                Login Using FIREBASE

            </header>

        </React.Fragment>
    );
}

export default Header;