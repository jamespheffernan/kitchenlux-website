#!/bin/bash

# Deploy KitchenLux Website to OneDrive
# This script assumes you have built the frontend

echo "Preparing files for OneDrive deployment..."

# Create deployment folder if it doesn't exist
mkdir -p deploy_onedrive

# Copy frontend dist files
cp -r frontend/dist/* deploy_onedrive/

# Copy the index.html wrapper
cp index.html deploy_onedrive/wrapper.html

echo "Files prepared in 'deploy_onedrive' folder"
echo ""
echo "Instructions:"
echo "1. Upload the 'deploy_onedrive' folder to your OneDrive"
echo "2. Select the folder in OneDrive and click 'Share'"
echo "3. Set the permissions to 'Anyone with the link can view'"
echo "4. Copy the share link and share with others"
echo ""
echo "Note: Backend functionality will be limited. For full functionality,"
echo "      deploy the backend separately using Render.com free tier."