"use client";
import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Header from '../dark/Header';
import Footer from '../dark/Footer';
import '../dark/MainPage.css';
import './ContactPage.css';

export default function ContactPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  // Theme-based CSS variables
  const themeStyles = theme === 'dark' ? {
    '--contact-bg': '#111111',
    '--contact-text': '#FFFFFF',
    '--contact-card-bg': '#1A1A1A',
    '--contact-btn-dark': '#FFFFFF',
    '--contact-btn-light': '#111111',
    '--contact-border': 'rgba(255, 255, 255, 0.1)',
    '--contact-label': '#A0A0A0',
  } : {
    '--contact-bg': '#FFFFFF',
    '--contact-text': '#000000',
    '--contact-card-bg': '#EBEBEB',
    '--contact-btn-dark': '#1D1D1B',
    '--contact-btn-light': '#FFFFFF',
    '--contact-border': '#CCCCCC',
    '--contact-label': '#666666',
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-theme={theme}>
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          // Moon icon for dark mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
          </svg>
        ) : (
          // Sun icon for light mode
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 2v2m0 12v2M4.22 4.22l1.42 1.42m8.72 8.72l1.42 1.42M2 10h2m12 0h2M4.22 15.78l1.42-1.42m8.72-8.72l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        )}
      </button>

      <Header theme={theme} />
      
      <div className="contact-page" style={themeStyles}>
        {/* Large Heading - Left Aligned */}
        <h1 className="contact-heading">Contact Us</h1>

      {/* Info Row: P | E | A */}
      <div className="contact-info-row">
        {/* Phone */}
        <div className="contact-info-item">
          <span className="contact-info-label">P.</span>
          <a href="tel:+995568921544" className="contact-info-value contact-link">
            +995 568 921 544
          </a>
        </div>

        {/* Email */}
        <div className="contact-info-item">
          <span className="contact-info-label">E.</span>
          <a href="mailto:contact@chipsa.design" className="contact-info-value contact-link">
            contact@chipsa.design
          </a>
        </div>

        {/* Address - with spacing from P/E */}
        <div className="contact-info-item contact-address">
          <span className="contact-info-label">A.</span>
          <span className="contact-info-value">
            Georgia, Tbilisi, Gomi<br />street 17
          </span>
          <a 
            href="https://maps.app.goo.gl/t1a4NDnLfappajK3A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            Find us here
          </a>
        </div>
      </div>

      {/* Bottom Section: Form Card | Social Icons */}
      <div className="contact-bottom-section">
        {/* Form Card - Left */}
        <div className="contact-form-card">
          <span className="contact-form-card-label">Form</span>
          <div className="contact-form-card-row">
            <p className="contact-form-card-text">
              Contact us, and we will start turning your dream into reality
            </p>
            <button 
              className="contact-form-card-btn"
              onClick={openForm}
            >
              Contact
            </button>
          </div>
        </div>

        {/* Social Icons - Right */}
        <div className="contact-social-icons">
          {/* Telegram */}
          <a 
            href="https://t.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-social-icon"
            aria-label="Telegram"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-social-icon"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-social-icon"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </div>

        {/* Contact Form Panel */}
        <ContactForm isOpen={isFormOpen} onClose={closeForm} />
      </div>

      <Footer theme={theme} />
    </div>
  );
}
