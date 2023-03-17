import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { async } from "@firebase/util";
import { auth, db } from '../firebase-config';
import '../styles/Chat.css';


export const Chat = (props) => {
    const { room } = props;

    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messagesRef = collection(db, "messages")

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room),orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages)
        })

        return () => unsubscribe();
    }, [])
    const submitBtn = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        setNewMessage("")

    }
    return <div className="chat-app">
        <div className="header">
            <h1>
                {`Wellcome to ${room.toUpperCase()}`}
            </h1>
        </div>

        <div className="messages">{messages.map((message) => <div className="message" key={message.id}>
            <span className="user">{message.user}</span>
            {message.text}
        </div>)}
        </div>
        <form onSubmit={submitBtn} className="new-message-form">
            <input onChange={(e) => { setNewMessage(e.target.value) }}
                value={newMessage} className="new-message-input" placeholder="Type message" />
            <button type="submit" className="send-button">Send</button>
        </form>
    </div>
}