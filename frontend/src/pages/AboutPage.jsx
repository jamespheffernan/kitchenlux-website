import React from 'react';
import { Link } from 'react-router-dom';
import './AboutFAQ.css'; // Shared styles for info pages

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="page-header">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> &gt; About Us
          </div>
          <h1>About KitchenLux</h1>
          <p>Discover our story and the passion behind our premium kitchenware rental service.</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="/images/about-founders.jpg" alt="KitchenLux founders" />
            </div>
            <div className="about-text">
              <h2>Our Story</h2>
              <p>KitchenLux was born from a simple frustration experienced by our founders, Michael and Sarah Chen, during a vacation rental stay in Napa Valley in 2023. Having planned an elaborate dinner to celebrate their anniversary, they were dismayed to find the kitchen equipped with dull knives, scratched pans, and inadequate tools.</p>
              <p>As passionate home cooks, they believed that a memorable vacation shouldn't mean compromising on cooking quality. They envisioned a service that would deliver premium kitchenware to vacation rentals, allowing travelers to cook with the same quality tools they enjoyed at home.</p>
              <p>What began as a small operation in San Francisco has quickly expanded to serve major vacation destinations across the country. Our mission is to enhance the vacation rental experience by providing chef-quality kitchen tools that inspire culinary creativity and bring joy to cooking, no matter where you are.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do at KitchenLux.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Quality Without Compromise</h3>
              <p>We source and maintain the highest quality kitchenware available, never settling for anything less than what professional chefs would approve.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">♻️</div>
              <h3>Sustainability</h3>
              <p>Our rental model promotes sustainability by reducing waste. Why buy new kitchenware for each vacation when you can simply rent what you need?</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧽</div>
              <h3>Impeccable Cleanliness</h3>
              <p>Every item is thoroughly sanitized and inspected between rentals, meeting commercial kitchen standards for cleanliness and safety.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Customer-Centric Service</h3>
              <p>We believe in going above and beyond to ensure our customers have an exceptional experience from booking to return.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Community Support</h3>
              <p>We partner with local culinary programs to donate a portion of our proceeds to culinary education initiatives in underserved communities.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Continuous Improvement</h3>
              <p>We constantly refine our offerings based on customer feedback, culinary trends, and innovations in kitchenware technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind KitchenLux who make premium kitchenware rentals possible.</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-ceo.jpg" alt="Michael Chen" />
              </div>
              <h3 className="team-member-name">Michael Chen</h3>
              <p className="team-member-title">Co-Founder & CEO</p>
              <p className="team-member-bio">A former chef turned entrepreneur with a passion for quality kitchenware and exceptional culinary experiences.</p>
            </div>
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-coo.jpg" alt="Sarah Chen" />
              </div>
              <h3 className="team-member-name">Sarah Chen</h3>
              <p className="team-member-title">Co-Founder & COO</p>
              <p className="team-member-bio">A hospitality industry veteran with expertise in logistics and customer experience design.</p>
            </div>
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-chef.jpg" alt="James Rodriguez" />
              </div>
              <h3 className="team-member-name">James Rodriguez</h3>
              <p className="team-member-title">Head of Culinary Curation</p>
              <p className="team-member-bio">A professional chef who curates our kitchenware collections and ensures they meet professional standards.</p>
            </div>
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-experience.jpg" alt="Emma Kim" />
              </div>
              <h3 className="team-member-name">Emma Kim</h3>
              <p className="team-member-title">Customer Experience Director</p>
              <p className="team-member-bio">Dedicated to ensuring every customer interaction exceeds expectations from first inquiry to final pickup.</p>
            </div>
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-logistics.jpg" alt="David Martinez" />
              </div>
              <h3 className="team-member-name">David Martinez</h3>
              <p className="team-member-title">Logistics Manager</p>
              <p className="team-member-bio">Coordinates our delivery and pickup system to ensure timely, seamless service across all locations.</p>
            </div>
            <div className="team-member">
              <div className="team-member-image">
                <img src="/images/team-quality.jpg" alt="Olivia Jackson" />
              </div>
              <h3 className="team-member-name">Olivia Jackson</h3>
              <p className="team-member-title">Quality Control Specialist</p>
              <p className="team-member-bio">Oversees our rigorous cleaning and maintenance protocols to keep our kitchenware in pristine condition.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real experiences from people who have used KitchenLux during their vacations.</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"As someone who travels frequently for work, KitchenLux has transformed my extended stays. Being able to cook properly in my rental has improved my quality of life on the road immensely."</p>
              <p className="testimonial-author">- Thomas K., Software Engineer</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"We planned a family reunion at a lake house, and KitchenLux allowed us to prepare memorable meals without hauling our own equipment. The delivery was seamless and the quality was exceptional."</p>
              <p className="testimonial-author">- Jennifer M., Event Planner</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"I'm a food blogger who needs specific equipment for recipe development. KitchenLux delivered everything I requested, perfectly cleaned and ready to use. It's a game-changer for foodies on vacation."</p>
              <p className="testimonial-author">- Raj P., Food Blogger</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The attention to detail is impressive. When I mentioned I'd be making pasta, they included a pasta measure and specialized pasta serving utensils I hadn't even thought to request. Truly exceptional service."</p>
              <p className="testimonial-author">- Maria G., Home Chef</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Elevate Your Vacation Cooking?</h2>
          <p>Experience the joy of cooking with professional-grade kitchenware during your next getaway.</p>
          <Link to="/booking" className="btn btn-large">Book Your Kitchenware Now</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;