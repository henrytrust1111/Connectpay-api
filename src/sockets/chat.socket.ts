import { Server, Socket } from "socket.io";
import { saveMessage, editMessage, deleteMessageForEveryone, deleteMessageForMe } from "../services/message.service";
import { sendPushNotification } from "../services/push.service";
import { findUserById } from "../services/user.service";

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
        const sender = await findUserById(data.sender_id);
        const senderName = sender?.name ?? "Someone";
        await sendPushNotification(data.receiver_id, {
          title: senderName,
          body: data.message,
          senderId: data.sender_id,
        });
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    });

    // Edit message
    socket.on("edit_message", async (data) => {
      try {
        // data: { message_id, editor_id, new_message }
        const updated = await editMessage(data.message_id, data.editor_id, data.new_message);
        io.emit("message_edited", updated);
      } catch (error) {
        console.error("Failed to edit message:", error);
        socket.emit("error", { message: (error as any).message });
      }
    });

    // Delete message (type: 'me' | 'everyone')
    socket.on("delete_message", async (data) => {
      try {
        // data: { message_id, requester_id, type }
        if (data.type === "everyone") {
          const updated = await deleteMessageForEveryone(data.message_id, data.requester_id);
          io.emit("message_deleted", { id: data.message_id, forEveryone: true, message: updated });
        } else {
          const updated = await deleteMessageForMe(data.message_id, data.requester_id);
          socket.emit("message_deleted", { id: data.message_id, forEveryone: false, deletedFor: data.requester_id });
        }
      } catch (error) {
        console.error("Failed to delete message:", error);
        socket.emit("error", { message: (error as any).message });
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
