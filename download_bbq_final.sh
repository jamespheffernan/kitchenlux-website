#!/bin/bash
# Script to download just the BBQ image

echo "Downloading BBQ Collection image..."
curl "https://cdn.pixabay.com/photo/2019/04/30/16/12/bbq-4169271_1280.jpg" -o "./images/bbq-collection.jpg"

echo "Verifying image size..."
BBQ_SIZE=$(stat -f%z "./images/bbq-collection.jpg")
echo "BBQ image size: $BBQ_SIZE bytes"

echo "Image download complete!"