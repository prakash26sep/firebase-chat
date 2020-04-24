import React from 'react';
//import logo from './logo.svg';
// import './App.css';
import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
        header: {
            width: '100%',
            height: '90px',
            margin: 'auto',
            color: 'white',
            backgroundColor: 'black'
        },
        body: {
            fontFamily: 'monospace',

        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '17px'
        }
    },
    main: {
        width: '90%',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 10px',
        fontFamily: 'monospace',
        fontSize: '25px'
    }
}));

function Header() {

    const classes = style();

    return (
        <React.Fragment>

            <header>
                <div className={classes.main}>
                    <div>Firebase Chat App</div>
                    <div><img src="message.png" /></div>
                </div>
            </header>

        </React.Fragment>
    );
}

export default Header;