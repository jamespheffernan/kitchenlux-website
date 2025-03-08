#!/bin/bash

# Deploy KitchenLux Website to iCloud Drive
# This script assumes you have built the frontend

echo "Preparing files for iCloud Drive deployment..."

# Create deployment folder if it doesn't exist
mkdir -p deploy_icloud

# Copy frontend dist files
cp -r frontend/dist/* deploy_icloud/

# Copy the index.html wrapper
cp index.html deploy_icloud/wrapper.html

echo "Files prepared in 'deploy_icloud' folder"
echo ""
echo "Instructions:"
echo "1. Upload the 'deploy_icloud' folder to your iCloud Drive"
echo "2. Right-click the folder in iCloud Drive and select 'Share'"
echo "3. Set the permissions to allow anyone to view"
echo "4. Copy the share link and share with others"
echo ""
echo "Note: Backend functionality will be limited. For full functionality,"
echo "      deploy the backend separately using Render.com free tier."