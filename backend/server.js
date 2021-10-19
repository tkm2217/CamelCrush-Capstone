import express from "express"
import cors from "cors"
import babytracker from "./api/babytracker.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/babytracker", babytracker)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app