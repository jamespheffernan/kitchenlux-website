#!/bin/bash
# Script to download images from Pixabay

echo "Downloading BBQ Collection image from Pixabay..."
curl "https://pixabay.com/get/g1a3eb6e3a68ac64bd1bda0dc88d3cab2318be5d642e1d3095d37cd40e9e4b5e9e9d6f6db79c3aefaa5f57b5dba5afbd6632711c5cb4d3a9b3a3f38dd6e9ee686_1280.jpg" -o "./images/bbq-collection.jpg"

echo "Downloading Holiday Cooking Kit image from Pixabay..."
curl "https://pixabay.com/get/g6c74dcc5fa1f66ab9a48f8d5b5c27b4cbc49cbaf1f3a52de5d6d18e6bf6cd98e7d65ccc6c3c54c63a7dec3d5c14a5d73a2d59f5add12f642e4acb2a51f9a84dc_1280.jpg" -o "./images/holiday-kit.jpg"

echo "Image downloads complete!"