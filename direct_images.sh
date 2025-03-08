#!/bin/bash
# Script to directly download stock images from CDNs

IMAGES_DIR="./images"

# Create directory if it doesn't exist
mkdir -p $IMAGES_DIR

# Download images with direct URLs
echo "Downloading chefs-kit.jpg..."
curl "https://i.postimg.cc/BnrQzW0D/chef-tools.jpg" -o "$IMAGES_DIR/chefs-kit.jpg"

echo "Downloading baking-collection.jpg..."
curl "https://i.postimg.cc/fy5Vwv1Q/baking-tools.jpg" -o "$IMAGES_DIR/baking-collection.jpg"

echo "Downloading italian-cuisine.jpg..."
curl "https://i.postimg.cc/rFVBnWjr/italian-cuisine.jpg" -o "$IMAGES_DIR/italian-cuisine.jpg"

echo "Downloading basic-cookware.jpg..."
curl "https://i.postimg.cc/fLsqW7cS/basic-cookware.jpg" -o "$IMAGES_DIR/basic-cookware.jpg"

echo "Downloading knife-collection.jpg..."
curl "https://i.postimg.cc/nhBTvzb7/knife-collection.jpg" -o "$IMAGES_DIR/knife-collection.jpg"

echo "Downloading cookware.jpg..."
curl "https://i.postimg.cc/L8mjc4K9/cookware.jpg" -o "$IMAGES_DIR/cookware.jpg"

echo "Downloading utensils.jpg..."
curl "https://i.postimg.cc/K8YJF0QH/utensils.jpg" -o "$IMAGES_DIR/utensils.jpg"

echo "Downloading premium-kitchenware.jpg..."
curl "https://i.postimg.cc/8CzPJnqv/premium-kitchenware.jpg" -o "$IMAGES_DIR/premium-kitchenware.jpg"

echo "Downloading sanitization.jpg..."
curl "https://i.postimg.cc/NjnbRBbV/sanitization.jpg" -o "$IMAGES_DIR/sanitization.jpg"

echo "Downloading delivery-service.jpg..."
curl "https://i.postimg.cc/L5HLyVLn/delivery-service.jpg" -o "$IMAGES_DIR/delivery-service.jpg"

echo "All direct images downloaded successfully to $IMAGES_DIR directory"