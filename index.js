import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/message", (_, res) => res.send("Hello from express!"));
// ViteExpress.config({ mode: "production" })

ViteExpress.listen(app, process.env.PORT || 5173, () => console.log("Server is listening..."));