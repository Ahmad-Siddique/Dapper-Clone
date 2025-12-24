"use client";
import React, { useState } from 'react';
import Dropdown from '../ui/Dropdown';

// Slide-out contact form panel
export default function ContactForm({ isOpen, onClose }) {
  const [service, setService] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted');
    // console.log({ service, country }); // For debugging
    onClose();
  };

  const serviceOptions = [
    { value: 'visa', label: 'Visa Services' },
    { value: 'residency', label: 'Residency' },
    { value: 'citizenship', label: 'Citizenship' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ];

  const countryOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'spain', label: 'Spain' },
    { value: 'italy', label: 'Italy' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`contact-form-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`contact-form-panel ${isOpen ? 'active' : ''}`}>
        <div className="contact-form-panel-inner">
          {/* Header */}
          <div className="contact-form-header">
            <h2 className="contact-form-title">
              Get<br />in touch
            </h2>
            <button 
              className="contact-form-close"
              onClick={onClose}
              aria-label="Close form"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Form */}
          <form className="contact-form-fields" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="contact-input-group">
              <input 
                type="text" 
                id="contact-name" 
                name="name" 
                placeholder=" "
                required
              />
              <label htmlFor="contact-name">* Name</label>
            </div>

            {/* Phone */}
            <div className="contact-input-group">
              <input 
                type="tel" 
                id="contact-phone" 
                name="phone" 
                placeholder=" "
                required
              />
              <label htmlFor="contact-phone">* Phone</label>
            </div>

            {/* Email */}
            <div className="contact-input-group">
              <input 
                type="email" 
                id="contact-email" 
                name="email" 
                placeholder=" "
                required
              />
              <label htmlFor="contact-email">* Email</label>
            </div>

            {/* Service Dropdown */}
            <div className={`contact-input-group select-group ${service ? 'has-value' : ''}`}>
              <Dropdown 
                options={serviceOptions}
                value={service}
                onChange={setService}
                name="service"
                placeholder=""
                id="contact-service"
              />
              <label htmlFor="contact-service">* Select a service</label>
            </div>

            {/* Country Dropdown */}
            <div className={`contact-input-group select-group ${country ? 'has-value' : ''}`}>
              <Dropdown 
                options={countryOptions}
                value={country}
                onChange={setCountry}
                name="country"
                placeholder=""
                id="contact-country"
              />
              <label htmlFor="contact-country">* Country of interest</label>
            </div>

            {/* Privacy Checkbox */}
            <div className="contact-checkbox-group">
              <input 
                type="checkbox" 
                id="contact-privacy" 
                name="privacy"
                required
              />
              <label htmlFor="contact-privacy">
                I agree with the <a href="/privacy-policy">privacy policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="contact-submit-btn">
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
