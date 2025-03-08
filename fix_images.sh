#!/bin/bash
# Script to fix the problematic images

echo "Downloading new BBQ Collection image..."
curl "https://source.unsplash.com/random/800x600/?bbq,grill" -o "./images/bbq-collection.jpg"

echo "Downloading new Holiday Kit image..."
curl "https://source.unsplash.com/random/800x600/?christmas,holiday,cooking" -o "./images/holiday-kit.jpg"

echo "Image downloads complete!"