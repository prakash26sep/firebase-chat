import React, { useEffect, useState } from 'react';
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
        justifyContent: 'center'
    },
    chatDiv: {
        marginTop: '20px',
        color: 'purple',
        '&>div': {
            margin: '10px',
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    chatHeading: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3px'
    },
    chatBoxMain: {
        // margin: '10px 0',
        lineHeight: '26px',
        height: '450px',
        overflowY: 'scroll',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
    },
    send: {
        '&:hover': {
            cursor: 'pointer',
        },
        backgroundColor: 'black',
        color: 'white',
        padding: '5px'
    },
    inputMessage: {
        padding: '5px',
        width: '100%'
    },
    chatOne: {
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '30px',
        margin: '10px 4px',
        borderRadius: '5px'
    },
    chatTwo: {
        border: '1px solid black',
        display: 'flex',
        backgroundColor: '#e3e3e3',
        color: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '30px',
        margin: '10px 4px',
        borderRadius: '5px'
    },

    chatInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '90%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    sendDiv: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    msg: {
        color: 'purple',
        display: 'flex',
        flexWrap: 'wrap',

        justifyContent: 'space-between',
        padding: '3px',
        width: '90%',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        }

    },
    grey: {
        color: 'grey'
    },
    deleteButton: {
        color: 'white',
        backgroundColor: 'red',
        padding: '2px 5px',
        '&:hover': {
            cursor: 'pointer'
        },
        borderRadius: '3px'
    },
    blockButton: {
        color: 'white',
        backgroundColor: 'red',
        padding: '2px 5px',
        '&:hover': {
            cursor: 'pointer'
        },
        borderRadius: '3px',
        marginLeft: '2px'
    },
    msgRight: {
        display: 'flex',
        '&>div': {
            margin: '1px'
        },
        alignItems: 'center'
    },
    blue: {
        color: 'blue'
    },
    block: {
        display: 'flex',
    },


}));



function useChat() {
    const [chat, setChat] = useState([])

    useEffect(() => {
        fire.firestore().collection('chats').onSnapshot((snapshot) => {
            const newChat = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            let sortedChat = newChat.sort(sortt);

            function sortt(a, b) {
                var dateA = a.time;
                var dateB = b.time;
                return dateA > dateB ? 1 : -1;
            };

            console.log(sortedChat)

            setChat(sortedChat);
        })

    }, [])

    return chat;
}

function ChatBox(props) {

    const classes = style();
    const chats = useChat();
    const [message, setMessage] = useState('');
    const email = props.email;

    chats.map((val, index) => {
        if (val.name !== email) {

            fire.firestore().collection("chats").doc(val.id).update({
                hasRead: true
            });

        }
    })

    // console.log(chats);

    console.log(email);

    const sendMessage = () => {
        fire.firestore().collection('chats').add({
            name: email,
            message: message,
            time: new Date().toLocaleString(),
            hasRead: false,
        })
    }

    const blockChat = () => {
        if (document.getElementById('block').innerHTML === 'Block') {
            document.getElementById('messageInput').disabled = true;
            document.getElementById('block').innerHTML = 'Unblock'
        }
        else {
            document.getElementById('messageInput').disabled = false;
            document.getElementById('block').innerHTML = 'Block'
        }
    }

    const deleteMessage = (e) => {

        fire.firestore().collection("chats").doc(`${e.target.id}`).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

    }
    const deleteChat = (e) => {

        fire.firestore().collection("chats")
            .get()
            .then(res => {
                res.forEach(element => {
                    element.ref.delete();
                });
            });
    }

    const checkSeen = (chat) => {

        if (chat.hasRead === false) {
            return <span>Unseen</span>;
        }
        else {
            return <span className={classes.blue}>Seen</span>
        }
    }

    const checkDelete = (chat) => {

        if (chat.name === email) {
            return <div className={classes.deleteButton} onClick={deleteMessage} id={chat.id}>
                Delete
            </div>;
        }
    }

    const chatting = (chat) => {

        if (chat.name === email) {

            return <div key={chat.id} className={classes.chatTwo}>
                <div className={classes.msg}>
                    <div>Msg: {chat.message}</div>
                    <div className={classes.msgRight}>
                        <div>{checkSeen(chat)}</div>
                        {checkDelete(chat)}

                    </div>
                </div>
                <div className={classes.chatInfo}>
                    <div>By: {chat.name} </div>
                    <div className={classes.grey}> Time: {chat.time}</div>
                </div>

            </div>
        }
        else {
            return <div key={chat.id} className={classes.chatOne}>
                <div className={classes.msg}>
                    <div>Msg: {chat.message}</div>
                    <div className={classes.msgRight}>
                        <div>{checkSeen(chat)}</div>
                        {checkDelete(chat)}
                    </div>
                </div>
                <div className={classes.chatInfo}>
                    <div>By: {chat.name} </div>
                    <div className={classes.grey}> Time: {chat.time}</div>
                </div>

            </div>
        }
    }


    return (
        <React.Fragment>
            <div className={classes.chatBoxMain}>
                <div className={classes.chatHeading}>
                    <div>Chat</div>
                    <div className={classes.block}><div onClick={deleteChat} className={classes.deleteButton}>Delete Chat </div><div id="block" onClick={blockChat} className={classes.blockButton}>Block</div></div>
                </div>

                {chats.map((chat) => {
                    return (
                        <div>{chatting(chat)}</div>
                    )
                })}


                <div className={classes.sendDiv}>
                    <input id="messageInput" className={classes.inputMessage} value={message} onChange={e => setMessage(e.currentTarget.value)} type="text" placeholder="Your message" />
                    <span onClick={sendMessage} className={classes.send}> Send</span>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ChatBox;