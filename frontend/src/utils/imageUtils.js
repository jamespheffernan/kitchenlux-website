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

// Map content images to placeholder Unsplash IDs for fallbacks
const CONTENT_IMAGE_MAP = {
  'premium-kitchenware': 'NQkdnQh-7X4',
  'sanitization': 'Bqi__JQSQGs',
  'delivery-service': 'CzfGz6JnGwE',
  'about-founders': 'S3GrMiUhpGk',
  'team-ceo': 'jyi2lL9L_5E',
  'team-coo': 'rDEOVtE7vOs',
  'team-chef': 'AJIqZDAUD7A',
  'team-developer': 'tBAsczqnuKM',
  'team-logistics': 'O3gLwP1CqpE',
  'team-support': 'sibVwORYqs0',
  'default': 'atsUqIm3wxo'
};

/**
 * Get a reliable image URL for a product using our proxy to avoid CORB issues
 * @param {string} productSlug - The slug of the product
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The proxied image URL
 */
export const getProductImageUrl = (productSlug, size = '800x600') => {
  // Product slug to local image filename mapping
  const PRODUCT_IMAGE_FILES = {
    'essential-kit': 'basic-cookware',
    'professional-chefs-kit': 'chefs-kit',
    'baking-collection': 'italian-cuisine',
    'italian-cuisine-kit': 'italian-cuisine',
    'basic-cookware-set': 'basic-cookware',
    'knife-master-collection': 'knife-collection',
    'bbq-collection': 'bbq-collection',
    'holiday-cooking-kit': 'bbq-collection',
    'asian-fusion-kit': 'italian-cuisine',
    'default': 'knife-collection'
  };
  
  // Extract the base slug without any query parameters
  const baseSlug = productSlug?.split('?')[0].toLowerCase().trim() || '';
  
  // Get the appropriate image filename for this product
  const imageName = PRODUCT_IMAGE_FILES[baseSlug] || PRODUCT_IMAGE_FILES.default;
  
  // Use our backend's direct image service
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
      
  // Use direct image endpoint to avoid CORB and proxy issues
  return `${API_URL}/images/direct/${imageName}`;
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
  
  // Use our backend's direct image service for reliability
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
  
  // Use direct image endpoint for better reliability
  return `${API_URL}/images/direct/kitchen-hero`;
};

/**
 * Get a fallback image URL if the main image fails to load
 * Using our proxy service to avoid CORB issues
 * @param {string} category - The category to use for the fallback (default: 'kitchen')
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The proxied fallback URL
 */
export const getFallbackImageUrl = (category = 'kitchen', size = '800x600') => {
  // Map categories to local image filenames
  const FALLBACK_IMAGE_MAP = {
    'kitchen': 'basic-cookware',
    'cookware': 'basic-cookware',
    'utensils': 'knife-collection', 
    'appliances': 'chefs-kit',
    'dining': 'italian-cuisine',
    'baking': 'italian-cuisine',
    'bbq': 'bbq-collection',
    'holiday': 'bbq-collection',
    'default': 'knife-collection'
  };
  
  // Get the appropriate filename based on category
  const imageName = FALLBACK_IMAGE_MAP[(category || '').toLowerCase()] || FALLBACK_IMAGE_MAP.default;
  
  // Use our backend's direct image service for reliability
  const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://kitchenlux-website.onrender.com/api'
      : 'http://localhost:5001/api');
      
  // Use direct image endpoint to avoid CORB and proxy issues
  return `${API_URL}/images/direct/${imageName}`;
};

/**
 * Get a placeholder image URL for content images
 * @param {string} imageName - The name of the image from the content-images directory
 * @param {string} size - The size of the image (default: 800x600)
 * @returns {string} - The image URL
 */
export const getContentImageUrl = (imageName, size = '800x600') => {
  // Extract just the base filename without path or extension
  const baseImageName = imageName.replace(/^\/images\//, '').replace(/\.\w+$/, '').toLowerCase();
  
  // Get Unsplash ID for this content image or use default
  const unsplashId = CONTENT_IMAGE_MAP[baseImageName] || CONTENT_IMAGE_MAP.default;
  
  // Parse the size values
  const [width, height] = size.split('x').map(Number);
  
  // Use source.unsplash.com which is more reliable for direct embedding
  return `https://source.unsplash.com/${unsplashId}/${width}x${height}`;
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

/**
 * Create an onError handler for content images
 * @param {string} imageName - The name of the content image
 * @param {string} size - The size of the image
 * @returns {Function} - The onError handler function
 */
export const createContentImageErrorHandler = (imageName, size = '800x600') => {
  return (e) => {
    e.target.onerror = null; // Prevent infinite error loops
    e.target.src = getContentImageUrl(imageName, size);
  };
};