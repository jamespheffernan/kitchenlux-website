#!/bin/bash
# Script to download reliable images for BBQ and Holiday collections

echo "Downloading BBQ Collection image..."
curl "https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg?auto=compress&cs=tinysrgb&w=800" -o "./images/bbq-collection.jpg"

echo "Downloading Holiday Cooking Kit image..."
curl "https://images.pexels.com/photos/5765804/pexels-photo-5765804.jpeg?auto=compress&cs=tinysrgb&w=800" -o "./images/holiday-kit.jpg"

echo "Verifying image sizes..."
BBQ_SIZE=$(stat -f%z "./images/bbq-collection.jpg")
HOLIDAY_SIZE=$(stat -f%z "./images/holiday-kit.jpg")

echo "BBQ image size: $BBQ_SIZE bytes"
echo "Holiday image size: $HOLIDAY_SIZE bytes"

if [ $BBQ_SIZE -lt 10000 ] || [ $HOLIDAY_SIZE -lt 10000 ]; then
  echo "WARNING: One or more images may not have downloaded correctly."
else
  echo "Image downloads complete and verified!"
fi