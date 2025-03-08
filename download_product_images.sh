#!/bin/bash

# Create products directory if it doesn't exist
mkdir -p images/products

# Download high-quality images for products
echo "Downloading product images..."

# Essential Kitchen Kit
curl -o images/products/essential-kit.jpg "https://plus.unsplash.com/premium_photo-1676389758109-d53dafd10893?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Professional Chef's Kit
curl -o images/products/chefs-kit.jpg "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Baking Collection
curl -o images/products/baking-collection.jpg "https://images.unsplash.com/photo-1612639267275-7c4ae6a18c4c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Italian Cuisine Kit 
curl -o images/products/italian-cuisine.jpg "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Basic Cookware Set
curl -o images/products/basic-cookware.jpg "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Knife Master Collection
curl -o images/products/knife-collection.jpg "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# BBQ Collection
curl -o images/products/bbq-collection.jpg "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Holiday Cooking Kit
curl -o images/products/holiday-kit.jpg "https://images.unsplash.com/photo-1544766673-45d0a4d72790?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

# Asian Fusion Kit
curl -o images/products/asian-fusion.jpg "https://images.unsplash.com/photo-1617196701537-7329482cc6e5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

echo "All images downloaded successfully"