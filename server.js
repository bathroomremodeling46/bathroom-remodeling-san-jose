const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:", "https://via.placeholder.com"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            connectSrc: ["'self'"]
        }
    }
}));

// Enable CORS
app.use(cors());

// Enable compression
app.use(compression());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API Routes (for future development)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'LocalSites Pro API is running',
        timestamp: new Date().toISOString()
    });
});

// Mock API for templates
app.get('/api/templates', (req, res) => {
    const templates = [
        {
            id: 1,
            name: 'Italian Restaurant',
            category: 'restaurant',
            description: 'Perfect for restaurants, cafes, and food businesses',
            image: 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Restaurant+Template',
            features: ['Online Menu', 'Reservations', 'Gallery', 'Contact']
        },
        {
            id: 2,
            name: 'Dental Practice',
            category: 'medical',
            description: 'Ideal for dentists, doctors, and healthcare providers',
            image: 'https://via.placeholder.com/300x200/2E86AB/FFFFFF?text=Medical+Template',
            features: ['Appointments', 'Services', 'Staff', 'Insurance']
        },
        {
            id: 3,
            name: 'Auto Repair Shop',
            category: 'automotive',
            description: 'Great for mechanics, car dealers, and auto services',
            image: 'https://via.placeholder.com/300x200/F18F01/FFFFFF?text=Auto+Repair+Template',
            features: ['Services', 'Estimates', 'Gallery', 'Reviews']
        },
        {
            id: 4,
            name: 'Plumbing Services',
            category: 'home-services',
            description: 'Perfect for plumbers, electricians, and contractors',
            image: 'https://via.placeholder.com/300x200/C73E1D/FFFFFF?text=Plumbing+Template',
            features: ['Emergency Contact', 'Services', 'Testimonials', 'Areas Served']
        },
        {
            id: 5,
            name: 'Law Firm',
            category: 'professional',
            description: 'Designed for lawyers, accountants, and consultants',
            image: 'https://via.placeholder.com/300x200/3A86FF/FFFFFF?text=Law+Firm+Template',
            features: ['Practice Areas', 'Attorney Profiles', 'Case Studies', 'Consultation']
        },
        {
            id: 6,
            name: 'Landscaping',
            category: 'home-services',
            description: 'Ideal for landscapers and garden services',
            image: 'https://via.placeholder.com/300x200/27AE60/FFFFFF?text=Landscaping+Template',
            features: ['Portfolio', 'Services', 'Maintenance Plans', 'Estimates']
        }
    ];

    const { category } = req.query;
    if (category && category !== 'all') {
        const filtered = templates.filter(t => t.category === category);
        return res.json(filtered);
    }

    res.json(templates);
});

// Mock API for authentication
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Mock authentication
    if (email && password) {
        res.json({
            success: true,
            user: {
                email: email,
                name: email.split('@')[0],
                plan: 'starter'
            },
            token: 'mock-jwt-token'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

app.post('/api/auth/signup', (req, res) => {
    const { fullName, email, password, businessType } = req.body;
    
    if (fullName && email && password && businessType) {
        res.json({
            success: true,
            user: {
                name: fullName,
                email: email,
                businessType: businessType,
                plan: 'trial'
            },
            token: 'mock-jwt-token'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
    });
});

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch all route - redirect to main page
app.get('*', (req, res) => {
    res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 LocalSites Pro server running on port ${PORT}`);
    console.log(`📱 Visit: http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;