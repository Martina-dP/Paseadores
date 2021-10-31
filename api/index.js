/*
                        ░░░░░░▄█▄█░░░░░▄░░░░░░
                        ░░░░██████░░░░░░█░░░░░
                        ░░░░░░███████████░░░░░
                        ▒▒▒▒▒▒█▀▀█▀▀██▀██▒▒▒▒▒
                        ▒▒▒▒▒▄█▒▄█▒▒▄█▒▄█▒▒▒▒▒
 */

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
servidor = require("http").createServer(server);
const socketIo = require("socket.io");

const io = socketIo(servidor, {
  cors: {
    origin: "*",
  },
});

let users = [];

const thisUsuario = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUsuario = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log("user id", userId);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // Cuando se conecta
  console.log("connection made successfully", socket.id);

  // io.emit("bienvenido", "Bienvenido al Servidor Socket");

  // Cuando toma el userId y el socketId del usuario ==> para no perder la referencia
  socket.on("thisUsuario", (userId) => {
    thisUsuario(userId, socket.id);
    io.emit("getUsers", users);
  });

  //Cuando se une a una sala
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User join Room : " + data);
  });

  //Cuando envia un mensaje en una sala
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  //Cuando envía un mensaje
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", { senderId, text });
  });
  //Cuando se desconecta
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    removeUsuario(socket.id);
  });
});

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  servidor.listen({ port: process.env.PORT || 3001 }, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
