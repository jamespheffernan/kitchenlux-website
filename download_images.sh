#!/bin/bash
# Script to download free stock images for KitchenLux website

IMAGES_DIR="./images"

# Create images directory if it doesn't exist
mkdir -p $IMAGES_DIR

# Hero and about images
curl "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop" -o "$IMAGES_DIR/kitchen-hero.jpg"
curl "https://images.unsplash.com/photo-1596189181426-7f63a1737f0d?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/about-founders.jpg"
curl "https://images.unsplash.com/photo-1622116587443-32492fbb85a6?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/premium-kitchenware.jpg"
curl "https://images.unsplash.com/photo-1590183050320-765887ba8896?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/sanitization.jpg"
curl "https://images.unsplash.com/photo-1591689304072-3098ee8fbceb?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/delivery-service.jpg"

# Team member photos
curl "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-ceo.jpg"
curl "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-coo.jpg"
curl "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-chef.jpg"
curl "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-experience.jpg"
curl "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-logistics.jpg"
curl "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/team-quality.jpg"

# Product images - using fixed direct links for ones that failed
curl "https://images.unsplash.com/photo-1631856724596-0dbfaabga2e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/chefs-kit.jpg"
curl "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/knife-set.jpg"
curl "https://images.unsplash.com/photo-1593439411281-6500cf61961c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/cookware.jpg"
curl "https://images.unsplash.com/photo-1593546354284-8e85b2d6182e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/utensils.jpg"
curl "https://images.unsplash.com/photo-1563257764-ec4bd2983cbe?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/storage-case.jpg"

# Product collections - using fixed direct links for ones that failed
curl "https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/essential-kit.jpg"
curl "https://images.unsplash.com/photo-1464500422302-6188776dcbf4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/baking-collection.jpg"
curl "https://images.unsplash.com/photo-1551218372-a8789b81b253?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/italian-cuisine.jpg"
curl "https://images.unsplash.com/photo-1586158291800-2665f07bba79?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/basic-cookware.jpg"
curl "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" -o "$IMAGES_DIR/knife-collection.jpg"

# Add-on accessories
curl "https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/spice-collection.jpg"
curl "https://images.unsplash.com/photo-1525373698358-041e3a460346?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/appliance-bundle.jpg"
curl "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=400&auto=format&fit=crop" -o "$IMAGES_DIR/damage-protection.jpg"

# Fallback to additional direct links for any that might still fail
# These don't use Unsplash's API but direct links to stable images
curl "https://images.unsplash.com/photo-1590794056486-2a2a92a2e1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" -o "$IMAGES_DIR/premium-kitchenware.jpg"
curl "https://images.unsplash.com/photo-1432139509613-5c4255815697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" -o "$IMAGES_DIR/chefs-kit.jpg"
curl "https://images.unsplash.com/photo-1563050860-e795621a74db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" -o "$IMAGES_DIR/cookware.jpg"
curl "https://images.unsplash.com/photo-1567021306524-92f1885df75e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" -o "$IMAGES_DIR/utensils.jpg"

# New product collections - updated with better images
curl "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/bbq-collection.jpg"
curl "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800&auto=format&fit=crop" -o "$IMAGES_DIR/holiday-kit.jpg"

echo "All images downloaded successfully to $IMAGES_DIR directory"