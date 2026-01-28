import { Server, Socket } from "socket.io";
import { saveMessage } from "../services/message.service";
import { sendPushNotification } from "../services/push.service";

export const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("send_message", async (data) => {
      try {
        // 1️⃣ Save message and get DB record back
        const savedMessage = await saveMessage({
          senderId: data.sender_id,
          receiverId: data.receiver_id,
          message: data.message,
          replyToMessageId: data.reply_to_message_id ?? null,
        });

        // 2️⃣ Emit ONLY the saved message (with id, createdAt, replyTo)
        io.emit("receive_message", savedMessage);

        // 🔔 PUSH NOTIFICATION
        await sendPushNotification(data.receiver_id, {
          title: "New message",
          body: data.message,
          senderId: data.sender_id,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

// import { Server, Socket } from "socket.io";
// import { saveMessage } from "../services/message.service";

// export const chatSocket = (io: Server) => {
//   io.on("connection", (socket: Socket) => {
//     console.log("A user connected:", socket.id);

//     socket.on("send_message", async (data: any) => {
//       console.log("Message received:", data);
//       await saveMessage(data);
//       io.emit("receive_message", data);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });
// };
