import React, { useState, useEffect } from "react";
import useSignalR from "./signalR.js";
import axios from "axios";

import ChatWindow from "./ChatWindow.jsx";
import ChatInput from "./ChatInput.jsx";

const Chat = () => {
  const { connection } = useSignalR("/r/chat");
  const [chat, setChat] = useState([]);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    (async () => {
      await axios.get("/api/messages").then((result) => {
        // console.log(result);
        const theData = result.data.map((m) => {
          return { user: m.fakeUserName, message: m.text };
        });
        setChat(theData);
      });
    })();
    (async () => {
      await axios
        .get("api/Channels")
        .then((response) => {
          console.log(response);
          setChannels(response.data);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  useEffect(() => {
    if (!connection) {
      return;
    } else {
      connection.on("ReceiveMessages", (user, message) => {
        console.log({ user: user, message: message });
        setChat((chat) => [...chat, { user: user, message: message }]);
      });
    }
  }, [connection]);

  const sendMessage = async (user, message, channel) => {
    if (connection) {
      try {
        // await connection.invoke("SendMessage", user, message);
        await axios.post(`/api/Messages/${1}/Messages`, {
          text: message,
          fakeUserName: user,
          ChannelId: channel,
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
    await axios.delete(`/api/delete/`);
  }

  return (
    <div>
      <h1>SignalR Chat</h1>
      <p>{connection ? "Connected" : "Not connected"}</p>
      <br></br>
      <br></br>
      <br></br>
      <ChatInput sendMessage={sendMessage} listOfChannels={channels} />
      <select name="Channels" id="Channels">
        {channels.map((m) => {
          <option value={m.channelName}>{m.channelName}</option>;
        })}
      </select>
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
