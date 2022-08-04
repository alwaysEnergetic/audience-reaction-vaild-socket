import React, { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Square from "./Square";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [emotion, setEmotion] = useState({
    emojIndex: null,
    socketId: null,
    room: null,
  });

  const [flag, setFlag] = useState(true);

  const handleFlag = () => {
    setFlag(true);
  };
  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("users", (user) => {
      setUsers(user.usersArray);
    });
  }, []);

  useEffect(() => {
    socket.on("choose", (emotion) => {
      setEmotion({
        emojIndex: emotion.emojIndex,
        socketId: emotion.socketId,
        room: emotion.room,
      });
    });
  }, []);

  useEffect(() => {
    socket.on("fadeAway", (flagOpt) => {
      console.log("----flagOpt=----", flagOpt.flag);
      setFlag(flagOpt.flag);
    });
  }, []);

  return (
    <div>
      {messages.map((val, i) => {
        return (
          <div key={i} className="message">
            {val.text}
            <br />
            <b>{val.user}</b>
          </div>
        );
      })}
      <Square
        users={users}
        index={emotion.emojIndex}
        id={emotion.socketId}
        room={emotion.room}
        flag={flag}
        handleFlag={handleFlag}
      />
    </div>
  );
};

export default Chat;
