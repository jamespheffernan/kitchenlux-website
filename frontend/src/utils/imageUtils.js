/**
 * Image utility functions for resolving URLs and handling fallbacks
 */

// Map of product types to Unsplash image IDs
const PRODUCT_IMAGE_MAP = {
  'essential-kit': 'IQVFVH0N_UU',
  'professional-chefs-kit': 'NQkdnQh-7X4',
  'baking-collection': 'oQvESMKUkzM',
  'italian-cuisine-kit': 'sA3wymYqyaI',
  'basic-cookware-set': 'h5yMpgOI5nI',
  'knife-master-collection': 'ACt8ycSzpdE',
  'bbq-collection': 'vIm26fn_QKg',
  'holiday-cooking-kit': 'Wc8k-KryEPM',
  'asian-fusion-kit': 'YZsvNs2GCPM',
  'default': 'FV3GConVSss'
};

// Hero and marketing images
const HERO_IMAGES = {
  'kitchen-hero': 'XoByiBymX20',
  'default': 'atsUqIm3wxo'
};

/**
 * Get a reliable image URL from Unsplash for a product
 * @param {string} productSlug - The slug of the product
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The Unsplash URL
 */
export const getProductImageUrl = (productSlug, size = '800x600') => {
  // Extract the base slug without any query parameters
  const baseSlug = productSlug.split('?')[0].toLowerCase().trim();
  
  // Get the Unsplash photo ID for this product, or use default
  const photoId = PRODUCT_IMAGE_MAP[baseSlug] || PRODUCT_IMAGE_MAP.default;
  
  // Return the Unsplash source URL with cache busting
  return `https://source.unsplash.com/${photoId}/${size}?t=${Date.now()}`;
};

/**
 * Get a hero image URL
 * @param {string} imageName - The name of the hero image
 * @param {string} size - The size of the image (default: 1200x800)
 * @returns {string} - The Unsplash URL
 */
export const getHeroImageUrl = (imageName, size = '1200x800') => {
  // Clean up the image name
  const cleanName = imageName.replace(/\/images\//g, '').replace('.jpg', '').toLowerCase().trim();
  
  // Get the Unsplash photo ID for this hero image, or use default
  const photoId = HERO_IMAGES[cleanName] || HERO_IMAGES.default;
  
  // Return the Unsplash source URL
  return `https://source.unsplash.com/${photoId}/${size}`;
};

/**
 * Get a fallback image URL if the main image fails to load
 * @param {string} category - The category to use for the fallback (default: 'kitchen')
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The fallback URL
 */
export const getFallbackImageUrl = (category = 'kitchen', size = '800x600') => {
  return `https://source.unsplash.com/random/${size}/?${category}`;
};

/**
 * Create an onError handler for image elements
 * @param {string} category - The category to use for the fallback
 * @param {string} size - The size of the image
 * @returns {Function} - The onError handler function
 */
export const createImageErrorHandler = (category = 'kitchen', size = '800x600') => {
  return (e) => {
    e.target.onerror = null; // Prevent infinite error loops
    e.target.src = getFallbackImageUrl(category, size);
  };
};