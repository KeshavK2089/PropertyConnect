import express, { type Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { propertyFilterSchema, type PropertyFilter } from "@shared/schema";
import { log } from "./utils";

export function createApp() {
  const app = express();

  // Body parsing middleware
  app.use(express.json({
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    }
  }));
  app.use(express.urlencoded({ extended: false }));

  // Request logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }

        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }

        log(logLine);
      }
    });

    next();
  });

  // API Routes
  
  // Get all properties with optional filtering
  app.get("/api/properties", async (req, res) => {
    try {
      const filter: Partial<PropertyFilter> = {};
      
      if (req.query.type) filter.type = req.query.type as any;
      if (req.query.status) filter.status = req.query.status as any;
      if (req.query.minPrice) filter.minPrice = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.maxPrice = Number(req.query.maxPrice);
      if (req.query.minSize) filter.minSize = Number(req.query.minSize);
      if (req.query.maxSize) filter.maxSize = Number(req.query.maxSize);
      if (req.query.bedrooms) filter.bedrooms = Number(req.query.bedrooms);
      if (req.query.bathrooms) filter.bathrooms = Number(req.query.bathrooms);
      if (req.query.search) filter.search = req.query.search as string;
      if (req.query.sortBy) filter.sortBy = req.query.sortBy as any;

      const validationResult = propertyFilterSchema.safeParse(filter);
      if (!validationResult.success) {
        return res.status(400).json({ error: "Invalid filter parameters" });
      }

      const properties = await storage.getProperties(validationResult.data);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // Get featured properties (first 5 available properties, newest first)
  app.get("/api/properties/featured", async (_req, res) => {
    try {
      const properties = await storage.getProperties();
      const featured = properties
        .filter(p => p.status === "available")
        .sort((a, b) => new Date(b.dateListed).getTime() - new Date(a.dateListed).getTime())
        .slice(0, 5);
      res.json(featured);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured properties" });
    }
  });

  // Get single property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const property = await storage.getProperty(req.params.id);
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      await storage.incrementPropertyViews(req.params.id);
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
  });

  return app;
}
