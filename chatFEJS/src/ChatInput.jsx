import React, { useState, useEffect } from "react";

import "./App.css";
const ChatInput = (props) => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(channel);
    const isUserProvided = user && user !== "";
    const isMessageProvided = message && message !== "";
    const isChannelProvided = channel && channel !== "";

    if (isUserProvided && isMessageProvided && isChannelProvided) {
      props.sendMessage(user, message, channel);
    } else {
      alert("Please insert an user, a message and a channel.");
    }
  };

  const onUserUpdate = (e) => {
    setUser(e.target.value);
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">User:</label>
      <br />
      <input id="user" name="user" value={user} onChange={onUserUpdate} />
      <br />
      <label htmlFor="message">Message:</label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={onMessageUpdate}
      />
      <label htmlFor="Channels">Channel: </label>
      <select
        name="Channels"
        id="Channels"
        onChange={(e) => setChannel(e.target.value)}
      >
        <option>Please choose one option</option>
        {props.listOfChannels?.map((m) => (
          <option key={m.channelId} value={m.channelName}>
            {m.channelName}
          </option>
        ))}
      </select>
      <br />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default ChatInput;
