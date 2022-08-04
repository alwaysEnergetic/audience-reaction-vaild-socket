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
  socket.on("select", ({ index, socketId }) => {
    console.log("------index,sockeId-->", index, socketId);
    socket.emit("choose", {
      emojIndex: index,
      socketId: socketId,
    });
  });
  socket.on("join", ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    const createdUsers = users();

    if (error) return callBack(error);
    socket.join(user.room);

    socket.emit("message", {
      //user: `I am ${user.name}!`,
      text: `Welcome to ${user.room}`,
    });

    io.to(user.room).emit("users", {
      usersArray: createdUsers,
    });

    console.log("----users", users());
    socket.broadcast.to(user.room).emit("message", {
      //user: `I am ${user.name}!`,
      //text: `${user.name} has joined!`,
    });

    callBack(null);

    socket.on("sendMessage", ({ message }) => {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    const removedUsers = users();
    console.log(user);
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
