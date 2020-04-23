import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
// import './App.css';
// import Navigation from './navigation/navigation';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ChatBox from './chatBox';
import { useParams } from "react-router-dom";
import fire from '../configuration/config';

import { makeStyles, createStyles } from '@material-ui/core';

const style = makeStyles(theme => createStyles({
    '@global': {
    },

    main: {
        width: '80%',
        display: 'flex',
        margin: 'auto',
        marginTop: '50px',
        alignItems: 'center',
        textAlign: 'center',
        padding: '100px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        border: '2px solid grey',
        borderRadius: '5px',
        justifyContent: 'space-around'
    },
    chatDiv: {
        marginTop: '20px',
        color: 'purple',
        '&>div': {
            margin: '10px',

        }
    },
    modal: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: '30px',
        marginRight: '40px',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // borderRadius: '10px',
        boxShadow: theme.shadows[1],
        // padding: theme.spacing(2, 4, 3),
        outline: 'none',
        width: '33%',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        }
    },
    center: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'center',
        padding: '5px 15px',
        borderRadius: '5px',
        margin: 'auto',
        backgroundColor: 'black',
        color: 'white',
        width: '100px',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    openModal: {
        border: '1px solid black',
        padding: '10px',
        borderRadius: '5px'
    },
    chatImg: {
        width: '50%',
        borderRadius: '5px',
        border: '2px solid grey'
        // margin: 'auto'
    },
    chatImgDiv: {
        width: '70%',
        borderRadius: '5px'
    },
    heading: {
        width: '50%',
        margin: 'auto',
        textAlign: 'center'
    },
    userid: {
        color: 'purple'
    }
}));

function useChat() {
    const [chat, setChat] = useState([])

    useEffect(() => {
        fire.firestore().collection('chats').onSnapshot((snapshot) => {
            const newChat = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setChat(newChat);
        })
    }, [])
    return chat
}

function Chat() {

    const classes = style();
    const chats = useChat();
    console.log(chats);
    let count = 0;
    chats.map(val => {
        if (val.hasRead === false) {
            count++;
        }
    })

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        console.log('Called')
    };

    const handleClose = () => {
        setOpen(false);
    };
    let { id } = useParams();
    let userEmailid = id.slice(1);
    // let { id} = match.params
    // console.log(userEmailId);

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <ChatBox email={userEmailid} />
                    </div>
                </Fade>
            </Modal>
            <div className={classes.heading}><h2>Welcome to Firebase Chat</h2>
                <div className={classes.userid}>{userEmailid}</div></div>

            <div className={classes.main}>
                <div className={classes.chatImgDiv}>
                    <img src="chat.jpg" alt="chat" className={classes.chatImg} />
                </div>
                <div>
                    <div>
                        Click to Start Chat
                    </div>
                    <div className={classes.chatDiv}>
                        <div className={classes.openModal} ><div onClick={handleOpen} className={classes.center}>Start Chatting</div></div>
                        <div>Total Messages: {chats.length}</div>
                        <div>Unread  Messages: {count}</div>
                        {/* <div className={classes.openModal} >Name: Naman<div onClick={handleOpen} className={classes.center}>Start Chatting</div></div> */}
                    </div>
                </div>
            </div>

            <a href="/"><div className={classes.center}>Logout</div></a>
        </React.Fragment>
    );
}

export default Chat;