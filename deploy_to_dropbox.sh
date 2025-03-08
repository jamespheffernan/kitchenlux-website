#!/bin/bash

# Deploy KitchenLux Website to Dropbox
# This script assumes you have built the frontend

echo "Preparing files for Dropbox deployment..."

# Create deployment folder if it doesn't exist
mkdir -p deploy_dropbox

# Copy frontend dist files
cp -r frontend/dist/* deploy_dropbox/

# Copy the index.html wrapper
cp index.html deploy_dropbox/wrapper.html

echo "Files prepared in 'deploy_dropbox' folder"
echo ""
echo "Instructions:"
echo "1. Upload the 'deploy_dropbox' folder to your Dropbox"
echo "2. Right-click the folder in Dropbox and select 'Share'"
echo "3. Set the permissions to 'Anyone can view'"
echo "4. Copy the share link and share with others"
echo ""
echo "Note: Backend functionality will be limited. For full functionality,"
echo "      deploy the backend separately using Render.com free tier."