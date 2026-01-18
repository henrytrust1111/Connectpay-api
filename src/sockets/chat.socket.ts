import { Server, Socket } from "socket.io";
import { saveMessage } from "../services/message.service";

export const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("send_message", async (data: any) => {
      await saveMessage(data);
      io.emit("receive_message", data);
    });
  });
};
