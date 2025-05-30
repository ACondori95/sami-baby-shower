require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/invitados", require("./routes/invitadoRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Seridor corriendo en el puerto ${PORT}`));
