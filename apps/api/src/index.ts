import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


app.use("/api/v1", routes);

export default app;