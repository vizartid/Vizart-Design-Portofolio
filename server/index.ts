import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

(async () => {
  const server = await registerRoutes(app);

  // Serve static files from attached_assets
  app.use('/attached_assets', express.static('attached_assets'));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const basePort = parseInt(process.env.PORT || '5000', 10);
  const host = '0.0.0.0';
  
  // Generate a list of ports to try (primary + fallbacks)
  const generatePortList = (primary: number): number[] => {
    const ports: number[] = [primary];
    // If using default port, try alternatives
    if (primary === 5000) {
      ports.push(5001, 5002, 5003, 5004, 5005);
    } else {
      // If custom port, try a few alternatives nearby
      ports.push(primary + 1, primary + 2, primary + 3);
    }
    return ports;
  };
  
  const portList = generatePortList(basePort);
  let currentPortIndex = 0;
  
  // Try to listen on the specified port, with recursive fallback to alternative ports
  const tryListen = (portIndex: number) => {
    if (portIndex >= portList.length) {
      log(`ERROR: unable to find available port. Tried: ${portList.join(', ')}`);
      process.exit(1);
      return;
    }
    
    const portToTry = portList[portIndex];
    
    // Create a new server for each attempt to avoid state issues
    const attemptServer = server;
    
    try {
      attemptServer.listen({
        port: portToTry,
        host,
        reusePort: false, // Disable reusePort for Windows compatibility
      }, () => {
        log(`serving on ${host}:${portToTry}`);
      });
      
      // Handle port in use error with proper cleanup
      const errorHandler = (err: any) => {
        if (err.code === 'EADDRINUSE') {
          log(`port ${portToTry} is already in use`);
          attemptServer.close(() => {
            // Remove this error handler and try next port
            attemptServer.removeListener('error', errorHandler);
            log(`attempting port ${portList[portIndex + 1]} instead...`);
            tryListen(portIndex + 1);
          });
        } else {
          log(`server error: ${err.message}`);
          throw err;
        }
      };
      
      attemptServer.once('error', errorHandler);
    } catch (err) {
      log(`failed to listen on port ${portToTry}: ${err}`);
      tryListen(portIndex + 1);
    }
  };
  
  // Start trying ports
  tryListen(currentPortIndex);
})();
