import express from "express";
import { routes } from "./routes.js";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(routes);

export { app };
