const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const { addUser, removeUser, users } = require("./user");
const PORT = 5000;

io.on("connection", (socket) => {
  socket.on("select", ({ index, socketId, room }) => {
    console.log("------index,sockeId-->", index, socketId, room);
    io.to(room).emit("choose", {
      emojIndex: index,
      socketId: socketId,
      room: room,
    });
  });

  socket.on("fade", ({ room }) => {
    console.log("------flag-->", room);
    io.to(room).emit("fadeAway", {
      flag: false,
    });
  });

  socket.on("join", ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    const createdUsers = users();

    if (error) return callBack(error);
    socket.join(user.room);

    socket.emit("message", {
      text: `Welcome to ${user.room}`,
    });

    io.to(user.room).emit("users", {
      usersArray: createdUsers,
    });

    callBack(null);

    socket.on("sendMessage", ({ message }) => {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    });

    console.log("---users------->", users);
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    const removedUsers = users();
    if (user !== undefined) {
      io.to(user.room).emit("message", {
        //user: "Admin",
        //text: `${user.name} just left the room`,
      });
      io.to(user.room).emit("users", {
        usersArray: removedUsers,
      });
    }
    console.log("A disconnection has been made");
  });
});

server.listen(PORT, () => console.log(`Server is Quannected to Port ${PORT}`));
