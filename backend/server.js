import express from "express"
import cors from "cors"
import babytracker from "./api/babytracker.route.js"
import users from "./routes/users.js"
import tracker from "./routes/tracker.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/babytracker", babytracker)
app.use("/api/v1/users", users)
app.use("/api/v1/tracker", tracker)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app