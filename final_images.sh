#!/bin/bash
# Script to download stock images with Pexels direct download links
# This ensures high-quality, properly-sized images for the website

IMAGES_DIR="./images"

# Create directory if it doesn't exist
mkdir -p $IMAGES_DIR

# Define function to download an image if it's missing or too small
download_image() {
    local filename="$1"
    local url="$2"
    local filepath="$IMAGES_DIR/$filename"
    
    # Check if file doesn't exist or is too small (less than 10KB)
    if [ ! -f "$filepath" ] || [ $(stat -f%z "$filepath") -lt 10000 ]; then
        echo "Downloading $filename..."
        curl -L "$url" -o "$filepath"
    else
        echo "Skipping $filename - already exists with good size"
    fi
}

# Stock images from Pexels - direct links to full-size images
download_image "baking-collection.jpg" "https://images.pexels.com/photos/6107791/pexels-photo-6107791.jpeg?cs=srgb&dl=pexels-anna-tarazevich-6107791.jpg&fm=jpg"
download_image "basic-cookware.jpg" "https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?cs=srgb&dl=pexels-fancycrave-com-129731.jpg&fm=jpg"
download_image "chefs-kit.jpg" "https://cdn.pixabay.com/photo/2015/09/16/20/10/cooking-943246_1280.jpg" 
download_image "cookware.jpg" "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?cs=srgb&dl=pexels-pixabay-534151.jpg&fm=jpg"
download_image "italian-cuisine.jpg" "https://cdn.pixabay.com/photo/2021/02/08/12/40/lasagna-5994612_1280.jpg"
download_image "knife-collection.jpg" "https://images.pexels.com/photos/3808057/pexels-photo-3808057.jpeg?cs=srgb&dl=pexels-los-muertos-crew-3808057.jpg&fm=jpg"
download_image "utensils.jpg" "https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_1280.jpg"
download_image "premium-kitchenware.jpg" "https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg"
download_image "sanitization.jpg" "https://images.pexels.com/photos/6698189/pexels-photo-6698189.jpeg?cs=srgb&dl=pexels-anete-lusina-6698189.jpg&fm=jpg"
download_image "delivery-service.jpg" "https://cdn.pixabay.com/photo/2020/03/27/17/03/shopping-4974313_1280.jpg"
download_image "storage-case.jpg" "https://cdn.pixabay.com/photo/2017/07/08/17/33/box-2485013_1280.jpg"

# Additional team and service images that might be needed
download_image "about-founders.jpg" "https://images.unsplash.com/photo-1596189181426-7f63a1737f0d?q=80&w=800&auto=format&fit=crop"
download_image "kitchen-hero.jpg" "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop"
download_image "team-ceo.jpg" "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
download_image "team-coo.jpg" "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
download_image "team-chef.jpg" "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop"
download_image "team-experience.jpg" "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop"
download_image "team-logistics.jpg" "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
download_image "team-quality.jpg" "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
download_image "appliance-bundle.jpg" "https://images.unsplash.com/photo-1525373698358-041e3a460346?q=80&w=400&auto=format&fit=crop"
download_image "damage-protection.jpg" "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=400&auto=format&fit=crop"
download_image "knife-set.jpg" "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop"
download_image "spice-collection.jpg" "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=400&auto=format&fit=crop"
download_image "essential-kit.jpg" "https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=400&auto=format&fit=crop"

echo "All images downloaded successfully to $IMAGES_DIR directory"