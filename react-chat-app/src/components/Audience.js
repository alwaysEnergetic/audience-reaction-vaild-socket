import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import io from "socket.io-client";
import "reactjs-popup/dist/index.css";
import "./square.css";

let socket;
const Audience = (props) => {
  const defaultEmo = ["👍", "👎", "😄", "🎉", "😕", "❤️"];
  const [btn, setBtn] = useState("...");
  const ENDPOINT = "http://localhost:5000";
  const socketId = props.name.id;
  socket = io(ENDPOINT);

  const handleClick = (index) => {
    console.log("---index-", index, socketId);
    socket.emit("select", { index, socketId });
  };

  useEffect(() => {
    socket.on("choose", (emotion) => {
      console.log("emotion", emotion.emojIndex, emotion.socketId);
      if (socketId === emotion.socketId) {
        setBtn(defaultEmo[emotion.emojIndex]);
      }
    });
  });

  return (
    <div>
      <h1 className="general-name">{props.name.name}</h1>
      <Popup
        trigger={<button className="emj-button"> {btn}</button>}
        position="right center"
      >
        <div>You can select one</div>
        {defaultEmo.map((item, index) => {
          return (
            <button onClick={() => handleClick(index)} key={index}>
              {item}
            </button>
          );
        })}
      </Popup>
    </div>
  );
};

export default Audience;
