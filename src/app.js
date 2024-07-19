import express from "express";
import repotRoutes from "./routes/reportEvents.js";
import placesRoute from "./routes/places.routes.js";
import scrapingRoutes from "./routes/scraping.routes.js";
import queueroutes from "./routes/queue.routes.js";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/report-routes/", repotRoutes);
app.use("/api/places/", placesRoute);
app.use("/api/scraping", scrapingRoutes);
app.use("/api/queue", queueroutes)

export default app;
