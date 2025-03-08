const express = require('express');
const router = express.Router();
const axios = require('axios');

// Proxy for Unsplash images
router.get('/proxy/:photoId/:size', async (req, res) => {
  try {
    const { photoId, size } = req.params;
    const imageUrl = `https://source.unsplash.com/${photoId}/${size}`;
    
    // Fetch image from Unsplash
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
    // Set headers and return image
    res.set('Content-Type', response.headers['content-type']);
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(response.data);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    res.status(500).send('Image fetch failed');
  }
});

module.exports = router;