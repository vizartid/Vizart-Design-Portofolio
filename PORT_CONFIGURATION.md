## Port Configuration - Final Documentation

### Current Setup

Your Mavent Studio website is now properly configured to handle port usage efficiently:

### Default Port: **5000**
- The application runs on port 5000 by default
- Server is currently **running successfully on http://localhost:5000**

### Port Configuration Features

1. **Environment Variable Support**
   - Set `PORT` environment variable to use a custom port
   - Example: `PORT=3000 npm run dev`

2. **Automatic Fallback**
   - If port 5000 is in use, the server will attempt port 5001
   - If a custom PORT is specified, it will use that port (no fallback)
   - Detailed error messages if no ports are available

3. **Configuration Files**
   - `.env` - Environment variables (includes PORT=5000)
   - `server/index.ts` - Port listening logic with error handling

### Server Configuration Details

The server in `server/index.ts` includes robust error handling:
- Attempts to listen on the specified port
- Logs the port being used: `serving on 0.0.0.0:5000`
- Graceful fallback to alternative port if EADDRINUSE error occurs
- Proper error handling for other server errors

### How to Use Different Ports

**Using default port (5000):**
```bash
npm run dev
```

**Using a custom port:**
```bash
PORT=5001 npm run dev
```

**Using Windows with custom port:**
```bash
set PORT=5001 && npm run dev
```

**Using macOS/Linux with custom port:**
```bash
export PORT=5001 && npm run dev
```

### Verification Results

✅ **Dev Server Status**: Running successfully
✅ **Port**: 5000
✅ **Build Process**: Completes without errors
✅ **All Pages**: Loading successfully
  - Homepage displays all sections
  - Works page shows projects with filters
  - About page accessible
  - Navigation working smoothly

### Accessing Your Site

**Local Development:**
- Open your browser and navigate to: **http://localhost:5000**

**Testing Different Pages:**
- Home: http://localhost:5000/
- Works: http://localhost:5000/works
- About: http://localhost:5000/about

### Production Deployment

For production, set the PORT environment variable to the port your hosting provider requires:
- Heroku: PORT is automatically set
- Vercel: PORT is automatically set
- Custom VPS: `PORT=80 npm run start`

### Troubleshooting

If you still get "EADDRINUSE" errors:

1. Find process using the port:
   ```bash
   lsof -i :5000
   ```

2. Kill the process:
   ```bash
   kill -9 <PID>
   ```

3. Use a different port:
   ```bash
   PORT=5001 npm run dev
   ```

### Summary

Your website is now production-ready with a robust port configuration system that:
- Works reliably on port 5000
- Falls back to port 5001 if needed
- Respects environment variables
- Includes proper error handling
- Builds and runs without issues

The application is fully functional and ready to deploy!
