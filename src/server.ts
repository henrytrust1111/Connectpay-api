import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { chatSocket } from "./sockets/chat.socket";
import { env } from "./config/env";
import { connectDB } from "./config/db";

const server = http.createServer(app);
const io = new Server(server);

chatSocket(io);

const startServer = async () => {
  await connectDB();
  server.listen(env.PORT, () => console.log("Server running"));
};

startServer();
