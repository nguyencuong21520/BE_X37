import express from "express";
import connectDB from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routers/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//connect to database
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api", router);

//handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
