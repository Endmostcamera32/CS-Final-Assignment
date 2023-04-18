import React, { useState, useEffect, useRef } from "react";
import useSignalR from "./signalR.js";
import axios from "axios";

import ChatWindow from "./ChatWindow.jsx";
import ChatInput from "./ChatInput.jsx";

const Chat = () => {
  const { connection } = useSignalR("/r/chat");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    axios.get("/api/messages").then((result) => {
      // console.log(result);
      result.data.map((m) => {
        setChat((chat) => [...chat, { user: m.fakeUserName, message: m.text }]);
      });
    });
  }, []);

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("ReceiveMessages", (user, message) => {
      console.log({ user: user, message: message });
      setChat((chat) => [...chat, { user: user, message: message }]);
    });
  }, [connection]);

  const sendMessage = async (user, message) => {
    if (connection) {
      try {
        // await connection.invoke("SendMessage", user, message);
        await axios.post(`/api/Messages/${1}/Messages`, {
          text: message,
          fakeUserName: user,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  async function handleDeleteText(e) {
    e.preventDefault();
    await axios.delete(`/api/delete/`)
  }

  return (
    <div>
      <h1>SignalR Chat</h1>
      <p>{connection ? "Connected" : "Not connected"}</p>
      <br></br>
      <br></br>
      <br></br>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />{" "}
    </div>
  );
};

export default Chat;
