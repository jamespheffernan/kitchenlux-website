#!/bin/bash

# Master deployment script for KitchenLux Website

echo "KitchenLux Website Deployment Tool"
echo "=================================="
echo ""
echo "This script will help you deploy the KitchenLux website."
echo ""

# Build the frontend
echo "Building the frontend..."
cd frontend
npm run build
cd ..

echo ""
echo "Please choose a deployment method:"
echo "1) Deploy to Google Drive"
echo "2) Deploy to Dropbox"
echo "3) Deploy to OneDrive"
echo "4) Deploy to iCloud Drive"
echo "5) View deployment instructions for full functionality"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    ./deploy_to_drive.sh
    ;;
  2)
    ./deploy_to_dropbox.sh
    ;;
  3)
    ./deploy_to_onedrive.sh
    ;;
  4)
    ./deploy_to_icloud.sh
    ;;
  5)
    cat DEPLOYMENT.md
    ;;
  *)
    echo "Invalid choice. Exiting."
    exit 1
    ;;
esac

echo ""
echo "Deployment preparation complete!"
echo "Follow the instructions above to complete the deployment."