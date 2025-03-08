# KitchenLux Website Deployment

This guide will help you deploy the KitchenLux website for free using various services.

## Option 1: Full Web Deployment (Recommended)

### Backend Deployment (Render.com - Free Tier)

1. Sign up for [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository or upload the code
4. Configure as follows:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
   - Environment Variables:
     - `NODE_ENV`: `production`
     - `PORT`: `10000` (Render will override this with their own port)
     - `MONGO_URI`: (Your MongoDB Atlas connection string)

### Frontend Deployment (Netlify - Free Tier)

1. Sign up for [Netlify](https://netlify.com)
2. Create a new site from Git or upload the built frontend files
3. Configure as follows:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Environment Variables: None required

### Database Setup (MongoDB Atlas - Free Tier)

1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a new free tier cluster
3. Set up a database user with a password
4. Get your connection string (format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`)
5. Add this connection string to your Render environment variables

## Option 2: Deploy Using Cloud Storage (Limited Functionality)

### Using Google Drive

1. Build the frontend: `cd frontend && npm run build`
2. Upload the entire `/frontend/dist` folder to Google Drive
3. Make the folder shareable with a public link
4. Share this link with users to access the static frontend 
   (Note: Backend functionality will be limited without a server)

### Using Dropbox

1. Build the frontend: `cd frontend && npm run build`
2. Upload the entire `/frontend/dist` folder to Dropbox
3. Create a shared link for the folder
4. Use the Dropbox shared link to access the static frontend
   (Note: Backend functionality will be limited without a server)

### Using OneDrive

1. Build the frontend: `cd frontend && npm run build`
2. Upload the entire `/frontend/dist` folder to OneDrive
3. Create a shared link with view permissions
4. Share this link to access the static frontend
   (Note: Backend functionality will be limited without a server)

## Important Notes

- Cloud storage solutions (Google Drive, Dropbox, OneDrive) can only host static files, so the backend functionality will not work
- For a fully functional site with working backend, use Option 1 with Render and Netlify
- Remember to update the API_URL in the frontend code if using Option 1
- MongoDB Atlas free tier provides 512MB of storage, which is sufficient for this application's initial use

## Updating Your Deployment

When you make changes:

1. Rebuild the frontend: `cd frontend && npm run build`
2. If using Netlify/Render, push changes to your repository or upload new files
3. If using cloud storage, replace the files in your shared folder