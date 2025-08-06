// Global variables
let currentUser = null;
let isLoggedIn = false;

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupScrollAnimations();
    setupTemplateFiltering();
    checkAuthStatus();
});

// Initialize application
function initializeApp() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Set up navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Modal event listeners
    setupModalEventListeners();

    // Form event listeners
    setupFormEventListeners();

    // Template interaction event listeners
    setupTemplateEventListeners();

    // CTA button interactions
    setupCTAEventListeners();
}

// Setup modal event listeners
function setupModalEventListeners() {
    // Login and signup button clicks
    document.querySelectorAll('a[href="#login"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('login');
        });
    });

    document.querySelectorAll('a[href="#signup"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('signup');
        });
    });

    // Close modal buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Switch between login and signup
    document.querySelectorAll('.auth-switch a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href === '#login') {
                showModal('login');
            } else if (href === '#signup') {
                showModal('signup');
            }
        });
    });
}

// Setup form event listeners
function setupFormEventListeners() {
    // Login form
    const loginForm = document.querySelector('#loginModal .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.querySelector('#signupModal .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Setup template event listeners
function setupTemplateEventListeners() {
    // Template preview and use buttons
    document.querySelectorAll('.template-card').forEach(card => {
        const previewBtn = card.querySelector('.btn-preview');
        const useBtn = card.querySelector('.btn-primary');
        
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                handleTemplatePreview(card);
            });
        }
        
        if (useBtn) {
            useBtn.addEventListener('click', () => {
                handleTemplateUse(card);
            });
        }
    });
}

// Setup CTA event listeners
function setupCTAEventListeners() {
    // Demo buttons
    document.querySelectorAll('a[href="#demo"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showDemo();
        });
    });

    // Start building buttons
    document.querySelectorAll('a[href="#signup"]').forEach(btn => {
        if (!btn.classList.contains('signup-btn')) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal('signup');
        });
    });
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Modal functions
function showModal(type) {
    closeModals(); // Close any open modals first
    
    if (type === 'login') {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else if (type === 'signup') {
        signupModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModals() {
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        if (email && password) {
            // Simulate successful login
            currentUser = {
                email: email,
                name: email.split('@')[0],
                plan: 'starter'
            };
            isLoggedIn = true;
            
            localStorage.setItem('user', JSON.stringify(currentUser));
            localStorage.setItem('isLoggedIn', 'true');
            
            closeModals();
            updateUIForLoggedInUser();
            showNotification('Welcome back! You are now logged in.', 'success');
        } else {
            showNotification('Please enter valid credentials.', 'error');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const businessType = formData.get('businessType');

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        if (fullName && email && password && businessType) {
            // Simulate successful signup
            currentUser = {
                name: fullName,
                email: email,
                businessType: businessType,
                plan: 'trial'
            };
            isLoggedIn = true;
            
            localStorage.setItem('user', JSON.stringify(currentUser));
            localStorage.setItem('isLoggedIn', 'true');
            
            closeModals();
            updateUIForLoggedInUser();
            showNotification('Account created successfully! Welcome to LocalSites Pro.', 'success');
            
            // Redirect to dashboard (simulate)
            setTimeout(() => {
                showDashboard();
            }, 2000);
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    updateUIForLoggedOutUser();
    showNotification('You have been logged out.', 'info');
}

function checkAuthStatus() {
    const storedUser = localStorage.getItem('user');
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (storedUser && storedLoginStatus === 'true') {
        currentUser = JSON.parse(storedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    const loginBtns = document.querySelectorAll('.login-btn');
    const signupBtns = document.querySelectorAll('.signup-btn');
    
    loginBtns.forEach(btn => {
        btn.textContent = 'Dashboard';
        btn.onclick = (e) => {
            e.preventDefault();
            showDashboard();
        };
    });
    
    signupBtns.forEach(btn => {
        btn.textContent = 'Logout';
        btn.onclick = (e) => {
            e.preventDefault();
            logout();
        };
    });
}

function updateUIForLoggedOutUser() {
    const loginBtns = document.querySelectorAll('.login-btn');
    const signupBtns = document.querySelectorAll('.signup-btn');
    
    loginBtns.forEach(btn => {
        btn.textContent = 'Login';
        btn.onclick = (e) => {
            e.preventDefault();
            showModal('login');
        };
    });
    
    signupBtns.forEach(btn => {
        btn.textContent = 'Start Free Trial';
        btn.onclick = (e) => {
            e.preventDefault();
            showModal('signup');
        };
    });
}

// Template filtering functionality
function setupTemplateFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const templateCards = document.querySelectorAll('.template-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter templates
            templateCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Template interaction functions
function handleTemplatePreview(card) {
    const templateName = card.querySelector('h3').textContent;
    showNotification(`Opening preview for ${templateName}...`, 'info');
    
    // Simulate opening preview
    setTimeout(() => {
        window.open('#', '_blank');
    }, 1000);
}

function handleTemplateUse(card) {
    if (!isLoggedIn) {
        showModal('signup');
        showNotification('Please create an account to use templates.', 'info');
        return;
    }
    
    const templateName = card.querySelector('h3').textContent;
    showNotification(`Setting up ${templateName} for your business...`, 'success');
    
    // Simulate template setup
    setTimeout(() => {
        showDashboard();
    }, 2000);
}

// Dashboard simulation
function showDashboard() {
    if (!isLoggedIn) {
        showModal('login');
        return;
    }
    
    // Create dashboard overlay
    const dashboardHTML = `
        <div id="dashboard-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            flex-direction: column;
            gap: 20px;
        ">
            <h2>Welcome to your Dashboard, ${currentUser.name}!</h2>
            <p>This is where you would manage your websites and templates.</p>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
                <button class="btn btn-primary" onclick="closeDashboard()">Close Dashboard</button>
                <button class="btn btn-secondary" onclick="startBuilding()">Start Building</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', dashboardHTML);
    document.body.style.overflow = 'hidden';
}

function closeDashboard() {
    const dashboard = document.getElementById('dashboard-overlay');
    if (dashboard) {
        dashboard.remove();
        document.body.style.overflow = 'auto';
    }
}

function startBuilding() {
    closeDashboard();
    showNotification('Website builder coming soon! This is a demo.', 'info');
}

// Demo functionality
function showDemo() {
    showNotification('Loading demo video...', 'info');
    
    // Create demo overlay
    const demoHTML = `
        <div id="demo-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            flex-direction: column;
            gap: 20px;
        ">
            <h2>Demo Video</h2>
            <div style="width: 80%; max-width: 800px; aspect-ratio: 16/9; background: #333; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 2px solid #2563eb;">
                <div style="text-align: center;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: #2563eb; margin-bottom: 20px;"></i>
                    <p>Demo video would play here</p>
                    <p style="font-size: 0.9rem; opacity: 0.7;">Showing how to build a local business website in 5 minutes</p>
                </div>
            </div>
            <button class="btn btn-primary" onclick="closeDemo()">Close Demo</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', demoHTML);
    document.body.style.overflow = 'hidden';
}

function closeDemo() {
    const demo = document.getElementById('demo-overlay');
    if (demo) {
        demo.remove();
        document.body.style.overflow = 'auto';
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .template-card, .step, .pricing-card, .testimonial-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(handleNavbarScroll, 10);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', debouncedScroll);

// Export functions to global scope for HTML onclick handlers
window.closeDashboard = closeDashboard;
window.startBuilding = startBuilding;
window.closeDemo = closeDemo;