import { WebSocketServer } from "ws";
import { database } from "@repo/prismadb/database";

const server = new WebSocketServer({
    port: 8082
});

server.on("connection", (ws) => {
    ws.on("message", async (mesg) => {
        // Convert Buffer to string if necessary
        const message = mesg.toString().trim(); // Convert and trim spaces

        console.log("Received message:", message);

        // Validate input
        if (!message || message === "") {
            ws.send("Invalid input: Please provide a valid name.");
            return;
        }

        try {
            // Try to insert data into the database
            const user = await database.user.create({
                data: {
                    name: message
                }
            });

            console.log("User created:", user);

            // Send success response to the client
            ws.send(`User "${user.name}" created successfully!`);
        } catch (e) {
            console.log("Error creating user:", e);

            // Send failure response to the client
            ws.send("Failed to create user. Internal server error.");
        }
    });
});