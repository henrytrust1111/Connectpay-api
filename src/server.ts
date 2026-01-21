import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { chatSocket } from "./sockets/chat.socket";
import { env } from "./config/env";
import { connectDB } from "./config/db";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST"]
  }
});

chatSocket(io);

const startServer = async () => {
  await connectDB();
  server.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
};

startServer();
