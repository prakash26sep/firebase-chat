// import PrivateRoute from 'react-private-route'
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { makeStyles, createStyles } from '@material-ui/core';
import React from 'react';
import Header from '../components/header';
import Section from '../components/section';
import Chat from '../components/chat';

function Navigation() {

    return (
        <BrowserRouter >

            <Header />

            <Switch >

                <Route path="/" exact>
                    <Section />
                </Route>

                <Route path="/chat:id">
                    <Chat />
                </Route>

            </Switch>

        </BrowserRouter>


    );
}

export default Navigation;