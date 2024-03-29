import express from "express";
import cors from "cors";
import mainRouter from "./app/routers/index.js";
import dotenv from "dotenv";

const app = express();
const router = express.Router();

dotenv.config();

const PORT = process.env.PORT || 5000;

// Define a whitelist of allowed origins
const whitelist = ["http://localhost:5173", "https://flex-health.netlify.app"];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the whitelist or if it's a local request
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "Success" });
});

app.use("/api/v1", mainRouter);

app.listen(PORT, `0.0.0.0`, (error) => {
  if (error) {
    console.log(`Error while server down, ERROR: ${error.message}`);
    return;
  }
  console.log(`Server is running on PORT: ${PORT}`);
});
