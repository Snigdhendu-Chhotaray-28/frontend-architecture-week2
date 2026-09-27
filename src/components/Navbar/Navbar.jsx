import React, { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Reusable Responsive Navigation Bar Component
 *
 * @param {Object} props
 * @param {React.ReactNode|string} [props.brand] - Brand logo or text
 * @param {Array<{label: string, href: string, active?: boolean, onClick?: Function}>} [props.links=[]] - Navigation items
 * @param {React.ReactNode} [props.actions] - Right-hand side action items (buttons, theme toggle)
 * @param {boolean} [props.sticky=true] - Whether navbar sticks to viewport top
 * @param {string} [props.className=''] - Additional custom CSS class
 */
export const Navbar = ({
  brand = 'NexusUI',
  links = [],
  actions = null,
  sticky = true,
  className = '',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (e, link) => {
    setIsMobileMenuOpen(false);
    if (link.onClick) {
      link.onClick(e);
    }
  };

  return (
    <header
      className={`navbar-header ${sticky ? 'navbar--sticky' : ''} ${
        isScrolled ? 'navbar--scrolled' : ''
      } ${className}`}
    >
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          {typeof brand === 'string' ? (
            <a href="#" className="navbar-brand__link">
              <span className="navbar-brand__logo-icon">✨</span>
              <span className="navbar-brand__text">{brand}</span>
            </a>
          ) : (
            brand
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav--desktop" aria-label="Main Navigation">
          <ul className="navbar-links">
            {links.map((link, index) => (
              <li key={index} className="navbar-item">
                <a
                  href={link.href}
                  className={`navbar-link ${link.active ? 'navbar-link--active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Desktop) */}
        <div className="navbar-actions">
          {actions}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="navbar-nav--mobile"
          aria-label="Mobile Navigation"
        >
          <ul className="navbar-links--mobile">
            {links.map((link, index) => (
              <li key={index} className="navbar-item--mobile">
                <a
                  href={link.href}
                  className={`navbar-link--mobile ${
                    link.active ? 'navbar-link--active' : ''
                  }`}
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
