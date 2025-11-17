import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup routes
await registerRoutes(app);

// Export serverless handler
export const handler = serverless(app);
