import { Server, Socket } from "socket.io";
import { saveMessage } from "../services/message.service";

export const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send_message", async (data: any) => {
      console.log("Message received:", data);
      await saveMessage(data);
      io.emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
