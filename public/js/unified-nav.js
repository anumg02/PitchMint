// Unified Navigation Component for PitchMint
function createUnifiedNavbar(currentPage = '', userType = 'guest') {
    const navbarHTML = `
        <nav class="unified-navbar">
            <div class="navbar-container">
                <a href="index.html" class="navbar-brand">
                    <div class="brand-logo">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <span>PitchMint</span>
                </a>

                <ul class="navbar-nav" id="navbar-nav">
                    <li class="nav-item">
                        <a href="index.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">
                            <i class="fas fa-home"></i>
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="discover.html" class="nav-link ${currentPage === 'discover' ? 'active' : ''}">
                            <i class="fas fa-search"></i>
                            Discover
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="pitches.html" class="nav-link ${currentPage === 'pitches' ? 'active' : ''}">
                            <i class="fas fa-presentation"></i>
                            Pitches
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="events.html" class="nav-link ${currentPage === 'events' ? 'active' : ''}">
                            <i class="fas fa-calendar-alt"></i>
                            Events
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="mentors.html" class="nav-link ${currentPage === 'mentors' ? 'active' : ''}">
                            <i class="fas fa-user-tie"></i>
                            Mentors
                        </a>
                    </li>
                    ${userType !== 'guest' ? `
                    <li class="nav-item">
                        <a href="messages.html" class="nav-link ${currentPage === 'messages' ? 'active' : ''}">
                            <i class="fas fa-envelope"></i>
                            Messages
                            <span class="notification-badge">3</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="live-event.html" class="nav-link ${currentPage === 'live-event' ? 'active' : ''}">
                            <i class="fas fa-video"></i>
                            Live
                        </a>
                    </li>
                    ` : ''}
                </ul>

                ${userType === 'guest' ? `
                <div class="navbar-actions">
                    <a href="login.html" class="btn-navbar btn-login">
                        <i class="fas fa-sign-in-alt"></i>
                        Login
                    </a>
                    <a href="register-startup-new.html" class="btn-navbar btn-signup">
                        <i class="fas fa-rocket"></i>
                        Get Started
                    </a>
                </div>
                ` : `
                <div class="navbar-actions">
                    <div class="user-profile">
                        <button class="profile-toggle">
                            <div class="profile-avatar">
                                ${userType === 'startup' ? 'ST' : 'IN'}
                            </div>
                            <span>${userType === 'startup' ? 'Startup' : 'Investor'}</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="profile-dropdown">
                            <a href="${userType === 'startup' ? 'dashboard-startup.html' : 'dashboard-investor.html'}" class="dropdown-item">
                                <i class="fas fa-tachometer-alt"></i>
                                Dashboard
                            </a>
                            <a href="analytics.html" class="dropdown-item">
                                <i class="fas fa-chart-bar"></i>
                                Analytics
                            </a>
                            <a href="profile-settings.html" class="dropdown-item">
                                <i class="fas fa-cog"></i>
                                Settings
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="index.html" class="dropdown-item">
                                <i class="fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
                `}

                <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </nav>
    `;
    
    // Auto-insert the navbar if called directly (for backward compatibility)
    if (typeof document !== 'undefined') {
        // Try to find existing navbar container (support both IDs)
        let navContainer = document.getElementById('navbar-container') || document.getElementById('unified-navbar-container');
        
        if (navContainer) {
            navContainer.innerHTML = navbarHTML;
        }
    }
    
    return navbarHTML;
}

// Mobile menu toggle function
function toggleMobileMenu() {
    const navbar = document.getElementById('navbar-nav');
    navbar.classList.toggle('mobile-open');
}

// Initialize navbar on page load
function initializeNavbar(currentPage = '', userType = 'guest') {
    // Try to find existing navbar container (support both IDs)
    let navContainer = document.getElementById('unified-navbar-container') || document.getElementById('navbar-container');
    
    if (!navContainer) {
        // Create navbar container if it doesn't exist
        navContainer = document.createElement('div');
        navContainer.id = 'navbar-container';
        document.body.insertBefore(navContainer, document.body.firstChild);
    }
    
    // Insert navbar HTML
    navContainer.innerHTML = createUnifiedNavbar(currentPage, userType);
    
    // Add smooth scroll behavior for anchor links
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
}

// Update notification count
function updateNotificationCount(count = 0) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }
}

// Add loading animation
function addPageLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .page-loading {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .page-loaded {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add loading class to body
    document.body.classList.add('page-loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        }, 100);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    addPageLoadingAnimation();
    
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.card, .stat-card, .result-card, .dashboard-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
});

// Global function to create navbar (backward compatibility)
function createNavbar(currentPage = '', userType = 'guest') {
    return initializeNavbar(currentPage, userType);
}

// Alternative function name for compatibility
window.createUnifiedNavbar = createUnifiedNavbar;
window.initializeNavbar = initializeNavbar;
