#!/bin/bash
# Script to download images from a different source

echo "Downloading BBQ Collection image..."
curl "https://cdn.pixabay.com/photo/2017/07/07/19/07/grill-2482147_1280.jpg" -o "./images/bbq-collection.jpg"

echo "Downloading Holiday Cooking Kit image..."
curl "https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_1280.jpg" -o "./images/holiday-kit.jpg"

echo "Verifying image sizes..."
BBQ_SIZE=$(stat -f%z "./images/bbq-collection.jpg")
HOLIDAY_SIZE=$(stat -f%z "./images/holiday-kit.jpg")

echo "BBQ image size: $BBQ_SIZE bytes"
echo "Holiday image size: $HOLIDAY_SIZE bytes"

echo "Image downloads complete!"