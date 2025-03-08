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
 * Get a reliable image URL for a product using our proxy to avoid CORB issues
 * @param {string} productSlug - The slug of the product
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The proxied image URL
 */
export const getProductImageUrl = (productSlug, size = '800x600') => {
  // Extract the base slug without any query parameters
  const baseSlug = productSlug?.split('?')[0].toLowerCase().trim() || '';
  
  // Get the Unsplash photo ID for this product, or use default
  const photoId = PRODUCT_IMAGE_MAP[baseSlug] || PRODUCT_IMAGE_MAP.default;
  
  // Use our backend proxy to avoid CORB issues
  // This requests the image through our own domain, avoiding cross-origin issues
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
      
  return `${API_URL}/images/proxy/${photoId}/${size}`;
};

/**
 * Get a hero image URL using our proxy to avoid CORB issues
 * @param {string} imageName - The name of the hero image
 * @param {string} size - The size of the image (default: 1200x800)
 * @returns {string} - The proxied image URL
 */
export const getHeroImageUrl = (imageName, size = '1200x800') => {
  // Clean up the image name
  const cleanName = imageName?.replace(/\/images\//g, '').replace('.jpg', '').toLowerCase().trim() || '';
  
  // Get the Unsplash photo ID for this hero image, or use default
  const photoId = HERO_IMAGES[cleanName] || HERO_IMAGES.default;
  
  // Use our backend proxy to avoid CORB issues
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
      
  return `${API_URL}/images/proxy/${photoId}/${size}`;
};

/**
 * Get a fallback image URL if the main image fails to load
 * Using our proxy service to avoid CORB issues
 * @param {string} category - The category to use for the fallback (default: 'kitchen')
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The proxied fallback URL
 */
export const getFallbackImageUrl = (category = 'kitchen', size = '800x600') => {
  // Map of categories to safe, direct Unsplash photo IDs
  const FALLBACK_IMAGE_MAP = {
    'kitchen': 'FV3GConVSss',
    'cookware': 'h5yMpgOI5nI',
    'utensils': 'ACt8ycSzpdE', 
    'appliances': 'IQVFVH0N_UU',
    'dining': 'sA3wymYqyaI',
    'baking': 'oQvESMKUkzM',
    'bbq': 'vIm26fn_QKg',
    'holiday': 'Wc8k-KryEPM',
    'default': 'FV3GConVSss'
  };
  
  // Get the appropriate photo ID based on category or use default
  const photoId = FALLBACK_IMAGE_MAP[(category || '').toLowerCase()] || FALLBACK_IMAGE_MAP.default;
  
  // Use our backend proxy to avoid CORB issues
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
      
  return `${API_URL}/images/proxy/${photoId}/${size}`;
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