import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import '../App.css';
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
        // padding: '100px 30px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        border: '2px solid grey',
        borderRadius: '5px',
        justifyContent: 'space-between',
        fontFamily: 'monospace',
        fontSize: '21px'
    },
    chatDiv: {
        marginTop: '20px',
        color: 'purple',
        '&>div': {
            margin: 'auto',

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
        borderRadius: '5px',
        width: '38%',
        marginBottom: '10px'
    },
    chatImg: {
        width: '100%',
        borderRadius: '5px',
        border: '2px solid grey'
        // margin: 'auto'
    },
    chatImgDiv: {
        width: '50%',
        borderRadius: '5px'
    },
    heading: {
        width: '90%',
        margin: 'auto',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'

        }
    },
    userid: {
        color: 'purple',
        fontFamily: 'monospace',
        fontSize: '17px'
    },
    unread: {
        color: 'green'
    },
    mainRight: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        margin: 'auto'
    },
    centers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '17px',
        '&>div': {
            padding: '5px 0'
        }
    },
    totalMsg: {
        paddingTop: '30px'
    },
    head: {
        color: 'black'
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
    let usersList = [];
    chats.map(val => {
        usersList.push(val.name);
    });
    let newUsersList = [...new Set(usersList)]

    console.log(newUsersList);
    // console.log(chats);
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

            <div className={classes.heading}><div><h2>Welcome to Firebase Chat</h2></div>
                <div className={classes.userid}>Logged User: {userEmailid}</div>
            </div><br />


            <div className={classes.centers}>
                <table id="members">
                    <tr>
                        <th>List of Users</th>
                    </tr>

                    {newUsersList.map(val => {
                        return <tr>
                            <td>{val}</td>
                        </tr>
                    })}</table>


            </div>

            <div className={classes.main}>
                <div className={classes.chatImgDiv}>
                    <img src="chat.jpg" alt="chat" className={classes.chatImg} />
                </div>
                <div className={classes.mainRight}>
                    <div><img src="chat.png" alt="chat" /></div>
                    <div>
                        Click to Start Chat
                    </div>
                    <div className={classes.chatDiv}>
                        <div className={classes.openModal} ><div onClick={handleOpen} className={classes.center}>Start Chatting</div></div>
                        <div className={classes.totalMsg}>Total Messages: {chats.length}</div>
                        <div className={classes.unread}>Unread  Messages: {count}</div>
                        {/* <div className={classes.openModal} >Name: Naman<div onClick={handleOpen} className={classes.center}>Start Chatting</div></div> */}
                    </div>
                </div>
            </div>

            <a href="/"><div className={classes.center}>Logout</div></a>
        </React.Fragment>
    );
}

export default Chat;