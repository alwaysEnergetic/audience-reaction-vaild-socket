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
  const [mySocketId, setMySocketId] = useState("");

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setRoom(room);
    setName(name);

    if (performance.navigation.type === 1) {
      console.log("This page is reloaded");
    } else {
      console.log("This page is not reloaded");
    }

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("select", (index) => {});
  }, []);

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
      <Square users={users} />
    </div>
  );
};

export default Chat;
