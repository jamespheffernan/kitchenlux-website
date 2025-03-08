// KitchenLux Website JavaScript

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    setupMobileNav();
    
    // Form validation for booking page
    setupFormValidation();
    
    // Product filter functionality
    setupProductFilters();
    
    // Booking page price calculation
    setupPriceCalculation();
    
    // Image gallery functionality
    setupImageGallery();
    
    // FAQ toggles
    setupFaqToggles();
    
    // Shopping cart functionality
    setupShoppingCart();
    
    // Form submission handling
    setupFormSubmission();
});

// Mobile Navigation
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target) && navLinks.classList.contains('show')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('show');
            }
        });
    }
}

// Form Validation
function setupFormValidation() {
    const bookingForm = document.querySelector('.booking-form');
    const contactForm = document.querySelector('.contact-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Required fields validation
            const requiredFields = bookingForm.querySelectorAll('input[required], select[required], textarea[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    markInvalid(field, 'This field is required');
                } else {
                    markValid(field);
                }
            });
            
            // Email validation
            const emailField = bookingForm.querySelector('#email');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                markInvalid(emailField, 'Please enter a valid email address');
            }
            
            // Phone validation
            const phoneField = bookingForm.querySelector('#phone');
            if (phoneField && phoneField.value && !isValidPhone(phoneField.value)) {
                isValid = false;
                markInvalid(phoneField, 'Please enter a valid phone number');
            }
            
            // Date validation
            const arrivalDate = bookingForm.querySelector('#arrival-date');
            const departureDate = bookingForm.querySelector('#departure-date');
            if (arrivalDate && departureDate && new Date(arrivalDate.value) >= new Date(departureDate.value)) {
                isValid = false;
                markInvalid(departureDate, 'Departure date must be after arrival date');
            }
            
            // Credit card validation
            const paymentMethodCredit = bookingForm.querySelector('.payment-method.active');
            if (paymentMethodCredit && paymentMethodCredit.textContent.includes('Credit Card')) {
                const cardNumber = bookingForm.querySelector('#card-number');
                const expiry = bookingForm.querySelector('#expiry');
                const cvv = bookingForm.querySelector('#cvv');
                
                if (cardNumber && !isValidCardNumber(cardNumber.value)) {
                    isValid = false;
                    markInvalid(cardNumber, 'Please enter a valid card number');
                }
                
                if (expiry && !isValidExpiry(expiry.value)) {
                    isValid = false;
                    markInvalid(expiry, 'Please enter a valid expiry date (MM/YY)');
                }
                
                if (cvv && !isValidCVV(cvv.value)) {
                    isValid = false;
                    markInvalid(cvv, 'Please enter a valid CVV code');
                }
            }
            
            if (!isValid) {
                event.preventDefault();
                // Scroll to first error
                const firstError = bookingForm.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Required fields validation
            const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    markInvalid(field, 'This field is required');
                } else {
                    markValid(field);
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                markInvalid(emailField, 'Please enter a valid email address');
            }
            
            if (!isValid) {
                event.preventDefault();
                // Scroll to first error
                const firstError = contactForm.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Validation helper functions
    function markInvalid(field, message) {
        field.classList.add('is-invalid');
        
        // Remove existing error message if any
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }
    
    function markValid(field) {
        field.classList.remove('is-invalid');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\d\s\-+()]{7,20}$/.test(phone);
    }
    
    function isValidCardNumber(cardNumber) {
        return /^\d{13,19}$/.test(cardNumber.replace(/\s/g, ''));
    }
    
    function isValidExpiry(expiry) {
        return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry);
    }
    
    function isValidCVV(cvv) {
        return /^[0-9]{3,4}$/.test(cvv);
    }
}

// Product Filtering
function setupProductFilters() {
    const filterBtns = document.querySelectorAll('.product-filter');
    const products = document.querySelectorAll('.product-card');
    
    if (filterBtns.length && products.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter products
                products.forEach(product => {
                    if (filterValue === 'all') {
                        product.style.display = 'block';
                    } else {
                        if (product.classList.contains(filterValue)) {
                            product.style.display = 'block';
                        } else {
                            product.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Dynamic Price Calculation
function setupPriceCalculation() {
    const addons = document.querySelectorAll('.add-on-item input[type="checkbox"]');
    const basePrice = document.querySelector('.summary-item:first-child .summary-value');
    const subtotalElement = document.querySelector('.summary-subtotal .summary-value');
    const taxElement = document.querySelector('.summary-item:nth-child(4) .summary-value');
    const totalElement = document.querySelector('.summary-total .summary-value');
    
    if (addons.length && basePrice && subtotalElement && taxElement && totalElement) {
        // Extract base price
        let basePriceValue = parseFloat(basePrice.textContent.replace(/[^0-9.]/g, ''));
        
        addons.forEach(addon => {
            addon.addEventListener('change', updateTotalPrice);
        });
        
        function updateTotalPrice() {
            let subtotal = basePriceValue;
            
            // Add prices of selected add-ons
            addons.forEach(addon => {
                if (addon.checked) {
                    const addonItem = addon.closest('.add-on-item');
                    const addonPrice = addonItem.querySelector('.add-on-price');
                    const priceValue = parseFloat(addonPrice.textContent.replace(/[^0-9.]/g, ''));
                    subtotal += priceValue;
                    
                    // Mark as selected for styling
                    addonItem.classList.add('selected');
                } else {
                    // Remove selected class if unchecked
                    const addonItem = addon.closest('.add-on-item');
                    addonItem.classList.remove('selected');
                }
            });
            
            // Calculate tax (assuming 8% tax rate)
            const taxRate = 0.08;
            const tax = subtotal * taxRate;
            
            // Calculate total
            const total = subtotal + tax;
            
            // Update displayed values
            subtotalElement.textContent = '$' + subtotal.toFixed(2);
            taxElement.textContent = '$' + tax.toFixed(2);
            totalElement.textContent = '$' + total.toFixed(2);
            
            // Update booking dates if they exist
            const arrivalDate = document.querySelector('#arrival-date');
            const departureDate = document.querySelector('#departure-date');
            const arrivalDisplay = document.querySelector('.date-item:first-child .date-value');
            const departureDisplay = document.querySelector('.date-item:last-child .date-value');
            
            if (arrivalDate && arrivalDate.value && arrivalDisplay) {
                const formattedArrival = new Date(arrivalDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                arrivalDisplay.textContent = formattedArrival;
            }
            
            if (departureDate && departureDate.value && departureDisplay) {
                const formattedDeparture = new Date(departureDate.value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                departureDisplay.textContent = formattedDeparture;
            }
        }
        
        // Set up date change listeners
        const arrivalDate = document.querySelector('#arrival-date');
        const departureDate = document.querySelector('#departure-date');
        
        if (arrivalDate && departureDate) {
            arrivalDate.addEventListener('change', updateTotalPrice);
            departureDate.addEventListener('change', updateTotalPrice);
        }
        
        // Set up payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        if (paymentMethods.length) {
            paymentMethods.forEach(method => {
                method.addEventListener('click', function() {
                    paymentMethods.forEach(m => m.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
    }
}

// Image Gallery
function setupImageGallery() {
    const mainImage = document.querySelector('.gallery-main-image');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    if (mainImage && thumbnails.length) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image src
                mainImage.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// FAQ Toggles
function setupFaqToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle answer visibility
                const answer = this.nextElementSibling;
                answer.classList.toggle('show');
            });
        });
    }
}

// Shopping Cart
function setupShoppingCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    
    let cart = JSON.parse(localStorage.getItem('kitchenLuxCart')) || [];
    
    // Update cart count
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
        
        // Save cart to localStorage
        localStorage.setItem('kitchenLuxCart', JSON.stringify(cart));
    }
    
    // Render cart items
    function renderCartItems() {
        if (cartItems) {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Your cart is empty</p>';
                return;
            }
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                    <div class="cart-item-remove" data-index="${index}">×</div>
                `;
                cartItems.appendChild(cartItem);
            });
            
            // Add remove event listeners
            const removeButtons = document.querySelectorAll('.cart-item-remove');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCartCount();
                    renderCartItems();
                });
            });
        }
    }
    
    // Toggle cart dropdown with animation
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', function(event) {
            event.stopPropagation();
            
            if (cartDropdown.classList.contains('show')) {
                // Close with animation
                cartDropdown.style.opacity = '0';
                cartDropdown.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    cartDropdown.classList.remove('show');
                }, 300);
            } else {
                // Open with animation
                cartDropdown.classList.add('show');
                setTimeout(() => {
                    cartDropdown.style.opacity = '1';
                    cartDropdown.style.transform = 'translateY(0)';
                    renderCartItems();
                }, 10);
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!cartIcon.contains(event.target) && !cartDropdown.contains(event.target) && cartDropdown.classList.contains('show')) {
                // Close with animation
                cartDropdown.style.opacity = '0';
                cartDropdown.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    cartDropdown.classList.remove('show');
                }, 300);
            }
        });
    }
    
    // Add to cart
    if (addToCartButtons.length) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace(/[^0-9.]/g, ''));
                const productImage = productCard.querySelector('img').src;
                
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
                
                updateCartCount();
                
                // Show confirmation toast
                showToast('Item added to cart!');
            });
        });
    }
    
    // Initialize cart count
    updateCartCount();
}

// Form submission with AJAX
function setupFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default form submission
            event.preventDefault();
            
            // Check if form is valid using the browser's validation
            if (!this.checkValidity()) {
                return;
            }
            
            // Collect form data
            const formData = new FormData(this);
            
            // Set the request as AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'process_form.php', true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            
            // Handle the response
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        
                        if (response.success) {
                            // Show success message
                            showToast('Thank you for your message! Reference: ' + response.data.reference);
                            
                            // Reset the form
                            contactForm.reset();
                        } else {
                            // Show error message
                            showToast('Error: ' + response.error);
                        }
                    } catch (e) {
                        showToast('An error occurred. Please try again later.');
                    }
                } else {
                    showToast('An error occurred. Please try again later.');
                }
            };
            
            // Handle network errors
            xhr.onerror = function() {
                showToast('A network error occurred. Please check your connection and try again.');
            };
            
            // Send the request
            xhr.send(formData);
        });
    }
    
    // Update booking form fields with values from URL parameters
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const productParam = urlParams.get('product');
        
        // If a product was specified in the URL, update the hidden field
        if (productParam) {
            const hiddenField = bookingForm.querySelector('input[name="selected_kit"]');
            if (hiddenField) {
                hiddenField.value = decodeURIComponent(productParam);
                
                // Also update the displayed selected kit
                const selectedKitName = bookingForm.querySelector('.add-on-item.selected .add-on-title');
                if (selectedKitName) {
                    selectedKitName.textContent = decodeURIComponent(productParam);
                }
            }
        }
    }
}

// Helper function to show premium toast notifications
function showToast(message) {
    // Check if a toast container exists, if not create one
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '30px';
        toastContainer.style.right = '30px';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element with icon
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Create icon element
    const iconSpan = document.createElement('span');
    iconSpan.textContent = '✓';
    iconSpan.style.display = 'inline-flex';
    iconSpan.style.justifyContent = 'center';
    iconSpan.style.alignItems = 'center';
    iconSpan.style.width = '24px';
    iconSpan.style.height = '24px';
    iconSpan.style.backgroundColor = 'rgba(255,255,255,0.2)';
    iconSpan.style.borderRadius = '50%';
    iconSpan.style.marginRight = '12px';
    iconSpan.style.fontWeight = 'bold';
    
    // Message container
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    // Add styling to toast
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.backgroundColor = 'rgba(146, 109, 38, 0.95)';
    toast.style.color = 'white';
    toast.style.padding = '16px 20px';
    toast.style.borderRadius = '4px';
    toast.style.marginTop = '12px';
    toast.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
    toast.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    toast.style.fontSize = '15px';
    toast.style.fontWeight = '500';
    toast.style.letterSpacing = '0.3px';
    toast.style.borderLeft = '4px solid #fff';
    
    // Append elements
    toast.appendChild(iconSpan);
    toast.appendChild(messageSpan);
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Remove after 3.5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}