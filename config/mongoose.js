const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codial_db");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to the database"));
db.once("open", () => {
    console.log("Successfully connected to the database");
});



module.exports = db; // Ensure you export the connection
