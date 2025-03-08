import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder, getUserProfile } from '../api';
import { toast } from 'react-toastify';
import './BookingPage.css';

const BookingPage = () => {
  const { cartItems, rentalDates, damageProtection, subtotal, damageProtectionFee, deliveryFee, tax, total, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
  });
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [showStripeForm, setShowStripeForm] = useState(false);

  // Payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    if (!rentalDates.start || !rentalDates.end) {
      toast.error('Please select rental dates');
      navigate('/cart');
      return;
    }
    
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile();
        setUserProfile(profile);
        
        // Pre-fill address if user has one
        if (profile && profile.address) {
          setAddressData({
            street: profile.address.street || '',
            city: profile.address.city || '',
            state: profile.address.state || '',
            postalCode: profile.address.postalCode || '',
            country: profile.address.country || 'USA',
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [cartItems, navigate, rentalDates, userInfo]);

  const handleAddressChange = (e) => {
    setAddressData({
      ...addressData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowStripeForm(method === 'stripe');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!addressData.street || !addressData.city || !addressData.state || !addressData.postalCode) {
      toast.error('Please fill in all address fields');
      return;
    }
    
    // Validate payment details
    if (paymentMethod === 'stripe') {
      if (!cardName || !cardNumber || !cardExpiry || !cardCVC) {
        toast.error('Please fill in all payment details');
        return;
      }
      
      // Basic card validation
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid card number');
        return;
      }
      
      if (cardExpiry.length < 5) {
        toast.error('Please enter a valid expiry date (MM/YY)');
        return;
      }
      
      if (cardCVC.length < 3) {
        toast.error('Please enter a valid CVC');
        return;
      }
    }
    
    try {
      setPlacingOrder(true);
      
      // In a real app, you would process payment with Stripe here
      // For now, we'll just simulate a successful payment
      
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        rentalAddress: addressData,
        paymentMethod,
        taxPrice: tax,
        deliveryPrice: deliveryFee,
        damageProtection,
        damageProtectionFee,
        totalPrice: total,
        rentalStart: rentalDates.start,
        rentalEnd: rentalDates.end,
      };
      
      const createdOrder = await createOrder(orderData);
      
      // In a real app, you would process the payment here
      // and update the order with the payment result
      
      // Clear cart and redirect to confirmation page
      clearCart();
      navigate(`/confirmation/${createdOrder._id}`);
      
    } catch (error) {
      toast.error(error.message || 'Failed to place order. Please try again.');
      setPlacingOrder(false);
    }
  };

  const formatCardNumber = (value) => {
    // Format card number with spaces after every 4 digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    // Format expiry date as MM/YY
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    
    return v;
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="booking-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        
        <div className="booking-container">
          <div className="booking-details">
            <form onSubmit={handlePlaceOrder}>
              <div className="booking-section">
                <h2>Rental Address</h2>
                <p className="section-description">
                  Please enter the address of your vacation rental where you'd like us to deliver your kitchenware.
                </p>
                
                <div className="form-group">
                  <label htmlFor="street">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    className="form-control"
                    value={addressData.street}
                    onChange={handleAddressChange}
                    required
                    placeholder="Enter street address"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      value={addressData.city}
                      onChange={handleAddressChange}
                      required
                      placeholder="Enter city"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      className="form-control"
                      value={addressData.state}
                      onChange={handleAddressChange}
                      required
                      placeholder="Enter state"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      className="form-control"
                      value={addressData.postalCode}
                      onChange={handleAddressChange}
                      required
                      placeholder="Enter postal code"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      className="form-control"
                      value={addressData.country}
                      onChange={handleAddressChange}
                      required
                    >
                      <option value="USA">United States</option>
                      <option value="CAN">Canada</option>
                      <option value="MEX">Mexico</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="booking-section">
                <h2>Payment Method</h2>
                <p className="section-description">
                  Choose your preferred payment method.
                </p>
                
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="stripe"
                      name="paymentMethod"
                      value="stripe"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => handlePaymentMethodChange('stripe')}
                    />
                    <label htmlFor="stripe" className="payment-label">
                      Credit Card
                      <span className="payment-icons">
                        💳
                      </span>
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => handlePaymentMethodChange('paypal')}
                    />
                    <label htmlFor="paypal" className="payment-label">
                      PayPal
                      <span className="payment-icons">
                        💰
                      </span>
                    </label>
                  </div>
                </div>
                
                {showStripeForm && (
                  <div className="stripe-form">
                    <div className="form-group">
                      <label htmlFor="cardName">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        className="form-control"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Enter name on card"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="0000 0000 0000 0000"
                        maxLength="19"
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiration Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          className="form-control"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cardCVC">CVC</label>
                        <input
                          type="text"
                          id="cardCVC"
                          className="form-control"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
                          placeholder="000"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="booking-section">
                <h2>Rental Information</h2>
                
                <div className="rental-info">
                  <div className="rental-info-row">
                    <span>Rental Period:</span>
                    <span>
                      {rentalDates.start?.toLocaleDateString()} - {rentalDates.end?.toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="rental-info-row">
                    <span>Damage Protection:</span>
                    <span>
                      {damageProtection ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-place-order"
                disabled={placingOrder}
              >
                {placingOrder ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="booking-summary">
            <h2>Order Summary</h2>
            
            <div className="cart-items-summary">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item-summary">
                  <div className="item-image">
                    <img 
                      src={item.image.startsWith('http') ? item.image : `${item.image}`}
                      alt={item.name} 
                    />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <div className="item-quantity">Qty: {item.qty}</div>
                    <div className="item-price">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {damageProtection && (
                <div className="cart-total-row">
                  <span>Damage Protection</span>
                  <span>${damageProtectionFee.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-total-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="cart-total-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;