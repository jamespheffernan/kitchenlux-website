import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopProducts } from '../api';
import { getHeroImageUrl, getProductImageUrl, createImageErrorHandler } from '../utils/imageUtils';
import './HomePage.css';

const HomePage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopProducts = async () => {
      try {
        const data = await fetchTopProducts();
        setTopProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top products:', error);
        setLoading(false);
      }
    };

    loadTopProducts();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Elevate Your Vacation Culinary Experience</h1>
              <p className="tagline">Luxury kitchenware delivered to your doorstep, for an uncompromising cooking experience.</p>
              <p>Don't settle for dull knives and flimsy pans during your vacation. KitchenLux delivers high-quality cookware, chef-grade knives, and premium kitchen tools directly to your vacation rental, transforming every meal into a gourmet experience.</p>
              <Link to="/catalog" className="btn">Rent Premium Kitchenware</Link>
              <Link to="/how-it-works" className="btn btn-outline" style={{ marginLeft: '10px' }}>Learn More</Link>
            </div>
            <div className="hero-image">
              <img 
                src={getHeroImageUrl('kitchen-hero')}
                alt="Premium kitchenware"
                onError={createImageErrorHandler('kitchen', '1200x800')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose KitchenLux?</h2>
            <p>We deliver a premium cooking experience to your vacation rental.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔪</div>
              <h3>Professional-Grade Quality</h3>
              <p>Every piece in our collection is carefully selected for quality, durability, and performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧽</div>
              <h3>Sanitized & Ready to Use</h3>
              <p>All items are professionally cleaned and sanitized before delivery to ensure the highest standards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Doorstep Delivery & Pickup</h3>
              <p>We deliver before your arrival and pick up after your departure - nothing to clean or return.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Curated Collections</h3>
              <p>From essential basics to specialty cuisine kits, we offer thoughtfully curated kitchenware collections.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="collections">
        <div className="container">
          <div className="section-header">
            <h2>Popular Collections</h2>
            <p>Our most loved kitchenware sets for every cooking need.</p>
          </div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="collections-grid">
              {topProducts.map((product) => (
                <div key={product._id} className="collection-card">
                  <div className="collection-image">
                    <img 
                      src={getProductImageUrl(product.slug)} 
                      alt={product.name}
                      loading="lazy"
                      onError={createImageErrorHandler(product.category?.toLowerCase() || 'kitchen')}
                    />
                  </div>
                  <div className="collection-content">
                    <h3>{product.name}</h3>
                    <p>{product.description.substring(0, 100)}...</p>
                    <div className="collection-price">${product.price.toFixed(2)}/week</div>
                    <Link to={`/products/${product.slug}`} className="btn">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="view-all">
            <Link to="/catalog" className="btn btn-outline">View All Collections</Link>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Renting premium kitchenware has never been easier.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Browse & Select</h3>
              <p>Choose from our curated kitchenware collections or customize your own.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Book & Pay</h3>
              <p>Secure your rental with our simple booking process and secure payment.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Doorstep Delivery</h3>
              <p>We deliver to your vacation rental before your arrival date.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Cook & Enjoy</h3>
              <p>Create memorable meals with premium kitchenware during your stay.</p>
            </div>
            <div className="step">
              <div className="step-number">5</div>
              <h3>Leave It All Behind</h3>
              <p>No cleanup or return needed. We pick everything up after you leave.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Hear from travelers who transformed their vacation cooking experience.</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"The Professional Chef's Kit exceeded my expectations. Every knife was razor-sharp, and the cookware distributed heat perfectly. It was like cooking in a professional kitchen while on vacation."</p>
              <p className="testimonial-author">- Marcus J., Chicago</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"I rented the Baking Collection for our family vacation, and we had the best time making cookies and pies together. Having all the proper tools made such a difference!"</p>
              <p className="testimonial-author">- Elena R., Boston</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The Italian Cuisine Kit had everything we needed to make authentic pasta dishes. The pasta roller alone was worth it! Will definitely rent again on our next trip."</p>
              <p className="testimonial-author">- Tony M., NYC</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Upgrade Your Vacation Cooking?</h2>
          <p>Book your premium kitchenware kit today and experience the joy of cooking with professional tools during your next vacation.</p>
          <Link to="/catalog" className="btn">Browse Collections Now</Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;