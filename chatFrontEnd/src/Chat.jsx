import React, { useState, useEffect } from "react";
import useSignalR from "./signalR.js";
import axios from "axios";

import ChatWindow from "./ChatWindow.jsx";
import ChatInput from "./ChatInput.jsx";

const Chat = () => {
  const { connection } = useSignalR("/r/chat");
  const [allChats, setAllChats] = useState([]);
  const [chat, setChat] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelToShow, setChannelToShow] = useState(0);

  useEffect(() => {
    (async () => {
      await axios.get("/api/messages").then((result) => {
        // console.log(result);
        const theData = result.data.map((m) => {
          console.log(m);
          return {
            user: m.fakeUserName,
            message: m.text,
            channelId: m.channelId,
          };
        });
        setAllChats(theData);
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
    if (channelToShow === "0" && allChats === chat) {
      return;
    } else if (channelToShow === "0" && allChats !== chat) {
      setChat(allChats);
    } else {
      const theChatToShow = allChats.filter(
        (m) => m.channelId == channelToShow
      );
      setChat(theChatToShow);
    }
  }, [channelToShow]);

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
        await axios.post(`/api/Messages/${channel}/Messages`, {
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
      <label htmlFor="Channels">Channel: </label>
      <select
        name="Channels"
        id="Channels"
        onChange={(e) => setChannelToShow(e.target.value)}
      >
        <option value={"0"}>All Chats from all channels</option>
        {channels?.map((m) => (
          <option key={m.channelId} value={m.channelId}>
            {m.channelName}
          </option>
        ))}
      </select>
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
