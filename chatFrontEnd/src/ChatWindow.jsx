import React from "react";

import Message from "./Message";

const ChatWindow = (props) => {
  return (
    <div>
      {props.chat.map((m) => (
        <Message
          key={Date.now() * Math.random()}
          user={m.user}
          message={m.message}
        />
      ))}
    </div>
  );
};

export default ChatWindow;
