const { io } = require("../index");

// Messages
io.on("connection", (client) => {
    client.on("disconnect", () => {
        console.log("Client disconnected.");
    });
});
