#!/bin/bash

# Deploy KitchenLux Website to Google Drive
# This script assumes you have built the frontend

echo "Preparing files for Google Drive deployment..."

# Create deployment folder if it doesn't exist
mkdir -p deploy_drive

# Copy frontend dist files
cp -r frontend/dist/* deploy_drive/

# Copy the index.html wrapper
cp index.html deploy_drive/wrapper.html

echo "Files prepared in 'deploy_drive' folder"
echo ""
echo "Instructions:"
echo "1. Upload the 'deploy_drive' folder to your Google Drive"
echo "2. Right-click the folder in Google Drive and select 'Share'"
echo "3. Make it 'Public on the web' or 'Anyone with the link'"
echo "4. Copy the share link and share with others"
echo ""
echo "Note: Backend functionality will be limited. For full functionality,"
echo "      deploy the backend separately using Render.com free tier."