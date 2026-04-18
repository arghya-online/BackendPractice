import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json({ limit: "16kb" })); // for parsing application/json with a limit of 16kb

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public")); // for serving static files from the "public" directory

export default app;
