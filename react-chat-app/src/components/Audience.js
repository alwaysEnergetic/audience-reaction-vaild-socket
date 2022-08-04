import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import io from "socket.io-client";
import "reactjs-popup/dist/index.css";
import "./square.css";

let socket;
const Audience = (props) => {
  const defaultEmo = ["👍", "👎", "😄", "🎉", "😕", "❤️", "..."];
  const [btn, setBtn] = useState("...");
  const ENDPOINT = "http://localhost:5000";
  const socketId = props.name.id;
  const room = props.name.room;
  const flag = props.flag;

  socket = io(ENDPOINT);

  const handleClick = (index) => {
    socket.emit("select", { index, socketId, room });
    props.handleFlag();

    setTimeout(() => {
      socket.emit("select", { index: 6, socketId, room });
    }, 5000);
  };

  useEffect(() => {
    if (socketId === props.id) {
      setBtn(defaultEmo[props.index]);
    }
  }, [props, socketId, defaultEmo]);

  console.log("flag2", flag, btn);
  return (
    <div>
      <h1 className="general-name">{props.name.name}</h1>
      <Popup
        trigger={
          flag ? (
            <button className="emj-button"> {btn}</button>
          ) : (
            <button className="emj-button">...</button>
          )
        }
        position="right center"
      >
        <div>You can select one</div>
        {defaultEmo.map((item, index) => {
          return index > 5 ? (
            <></>
          ) : (
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
