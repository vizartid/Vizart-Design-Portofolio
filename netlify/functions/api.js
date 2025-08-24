const express = require("express");
const serverless = require("serverless-http");
const path = require("path");

// Import your existing server routes
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from attached_assets
app.use(
  "/attached_assets",
  express.static(path.join(__dirname, "../../attached_assets")),
);

// Import and register your existing routes
// Note: You'll need to adapt your existing routes to work with serverless functions
app.get("/api/content", async (req, res) => {
  try {
    // Your existing content logic here
    const content = {
      branding: {
        logoUrl: "/attached_assets/logo-vizart.png",
        logoText: "Vizart",
      },
      hero: {
        title: "Delivering Standout",
        titleHighlight: "Digital Creations",
        subtitle: "Through Seamless Partnership",
      },
      // Add other content sections...
    };
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

// Add other API routes as needed...

module.exports.handler = serverless(app);
