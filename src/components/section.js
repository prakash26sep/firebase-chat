import React, { useState } from 'react';
//import logo from './logo.svg';
// import './App.css';
import fire from '../configuration/config';
import { Link } from "react-router-dom";

import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
        h2: {
            textAlign: 'center'
        },
        a: {
            textDecoration: 'none',
            color: 'white'
        },
        section: {
            display: 'flex',
            width: '80%',
            flexDirection: 'column',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
            color: 'black',

            '&>div': {
                width: '80%',
                display: 'flex',
                justifyContent: 'center',
            }

        },
        input: {
            width: '100%',
            padding: '10px'
        },
    },
    center: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'center',
        padding: '5px 15px',
        borderRadius: '5px',
        backgroundColor: 'black',
        color: 'white',
        width: '100px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    successLogin: {
        display: 'none',
        // display: 'flex',
        width: '80%',
        textAlign: '-webkit-center',
        flexDirection: 'column',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        color: 'black',
        // marginTop: '150px',
        // alignItems: 'center'
    },
    error: {
        color: 'purple'
    },
    main: {
        width: '80%',
        display: 'flex',
        margin: 'auto',
        marginTop: '50px',
        alignItems: 'center',
        padding: '100px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        border: '2px solid grey',
        borderRadius: '5px'

    },
    loginDiv: {
        width: '50%',
        border: '1px solid black',
        borderRadius: '8px'
    },
    loginImg: {
        width: '100%'
    },
    sectionDiv: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%'
        },
    },
    logo: {
        marginBottom: '20px'
    }

}));

function Header() {

    const classes = style();

    const [email, changeEmail] = useState("");
    const [emailError, changeEmailError] = useState("");

    const [password, changePassword] = useState("");
    const [passwordError, changePasswordError] = useState("");

    const changingEmail = (e) => {
        changeEmail(e.target.value);
    };

    const changingPassword = (e) => {
        changePassword(e.target.value);
    };

    const login = (e) => {

        changeEmailError("");
        changePasswordError("");

        // eslint-disable-next-line
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        let count = 0;

        if (email === "" || emailRegex.test(email) === false) {
            changeEmailError("Enter valid Email");
        } else { count++; }

        if (password === "" || password.length < 6) {
            changePasswordError("Enter valid Password and Min 6 chars");
        } else { count++; }


        if (count === 2) {
            fire.auth().signInWithEmailAndPassword(email, password).then((u) => {
                // alert("Login Success");
                console.log(u);
                document.getElementById("success").style.display = "block";
                document.getElementById("section").style.display = "none";
                changeEmailError(u.message);


            }).catch((error) => {
                console.log(error);
                alert(error)
                changeEmailError(error.Error);
            })
        }

    };

    const logout = () => {
        document.getElementById("section").style.display = "flex";
        document.getElementById("success").style.display = "none";
    };

    return (
        <React.Fragment>

            <h2>Firebase Login Authentication and Chat</h2>

            <div className={classes.main}>
                <div className={classes.loginDiv}>
                    <img className={classes.loginImg} src="login.jpg" alt="login" />
                </div>
                <div className={classes.sectionDiv}>
                    <section id="section">

                        <div className={classes.logo}><img alt="loginLogo" src="login.png" /></div>

                        <div>Your Email</div>
                        <div><input type="text" placeholder="Email ID" onChange={changingEmail} /></div>
                        <div className={classes.error}>{emailError}</div>
                        <br /><br />

                        <div>Your Password</div>
                        <div><input type="password" placeholder="Password" onChange={changingPassword} /></div>
                        <div className={classes.error}>{passwordError}</div>

                        <div>
                            <div className={classes.center} onClick={login}>Login</div>
                        </div>

                    </section>

                    <div className={classes.successLogin} id="success">

                        <div className={classes.logo}><img alt="loginLogo" src="login.png" /></div>
                        <div>Welcome User</div>

                        <div>
                            <a href={`/chat:${email}`}><div className={classes.center}>Start Chat</div></a>
                            {/* <Link to={``}>Modus Create</Link> */}
                            <div className={classes.center} onClick={logout}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>



        </React.Fragment>
    );
}

export default Header;