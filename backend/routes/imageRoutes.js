const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Direct image serving endpoint for simple cases
router.get('/direct/:name', (req, res) => {
  try {
    const { name } = req.params;
    const safeFilename = name.replace(/\.\./g, '').replace(/\//g, ''); // Security
    const imagePath = path.join(__dirname, '../../images/products', safeFilename + '.jpg');
    
    if (fs.existsSync(imagePath)) {
      const image = fs.readFileSync(imagePath);
      res.set('Content-Type', 'image/jpeg');
      res.set('Cache-Control', 'public, max-age=86400');
      return res.send(image);
    } else {
      // Fallback to any available image
      const imageDir = path.join(__dirname, '../../images/products');
      const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.jpg'));
      
      if (files.length > 0) {
        const fallbackImage = path.join(imageDir, files[0]);
        const image = fs.readFileSync(fallbackImage);
        res.set('Content-Type', 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=86400');
        return res.send(image);
      } else {
        res.status(404).send('No images available');
      }
    }
  } catch (error) {
    console.error('Direct image error:', error.message);
    res.status(500).send('Error serving image');
  }
});

// Proxy for Unsplash images
router.get('/proxy/:photoId/:size', async (req, res) => {
  try {
    const { photoId, size } = req.params;
    const imageUrl = `https://source.unsplash.com/${photoId}/${size}`;
    
    console.log(`Proxying image request for: ${imageUrl}`);
    
    // Using axios with timeout and proper error handling
    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'arraybuffer',
      timeout: 5000, // 5 second timeout
      maxRedirects: 5,
      validateStatus: status => status < 500 // Handle redirects properly
    });
    
    // Set headers and return image
    res.set('Content-Type', response.headers['content-type'] || 'image/jpeg');
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(response.data);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    
    // Fallback to local images if available
    try {
      const { photoId } = req.params;
      
      // Create mapping from Unsplash IDs to local files
      const photoMapping = {
        'IQVFVH0N_UU': 'essential-kit.jpg',
        'NQkdnQh-7X4': 'chefs-kit.jpg',
        'oQvESMKUkzM': 'baking-collection.jpg',
        'sA3wymYqyaI': 'italian-cuisine.jpg',
        'h5yMpgOI5nI': 'basic-cookware.jpg',
        'ACt8ycSzpdE': 'knife-collection.jpg',
        'vIm26fn_QKg': 'bbq-collection.jpg',
        'Wc8k-KryEPM': 'holiday-kit.jpg',
        'YZsvNs2GCPM': 'asian-fusion.jpg',
        'FV3GConVSss': 'essential-kit.jpg', // This is the one causing problems
        'XoByiBymX20': 'kitchen-hero.jpg',
        'atsUqIm3wxo': 'kitchen-hero.jpg',
        'default': 'essential-kit.jpg'
      };
      
      // Try to find a fallback image based on the Unsplash ID
      const filename = photoMapping[photoId] || photoMapping.default;
      const imageDir = path.join(__dirname, '../../images/products');
      const fallbackImage = path.join(imageDir, filename);
      
      if (fs.existsSync(fallbackImage)) {
        console.log(`Using fallback image: ${fallbackImage}`);
        const image = fs.readFileSync(fallbackImage);
        res.set('Content-Type', 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=86400');
        return res.send(image);
      } else {
        // If specific image not found, use any available image
        const files = fs.readdirSync(imageDir);
        if (files.length > 0) {
          const randomImage = path.join(imageDir, files[0]);
          console.log(`Using random fallback image: ${randomImage}`);
          const image = fs.readFileSync(randomImage);
          res.set('Content-Type', 'image/jpeg');
          res.set('Cache-Control', 'public, max-age=86400');
          return res.send(image);
        }
      }
    } catch (fallbackError) {
      console.error('Fallback image failed:', fallbackError.message);
    }
    
    // If all else fails, send the error
    res.status(500).send('Image fetch failed: ' + error.message);
  }
});

module.exports = router;