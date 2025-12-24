"use client";
import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

export default function Dropdown({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  label, 
  id,
  name 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div 
      className={`dropdown-container ${isOpen ? 'open' : ''}`} 
      ref={dropdownRef}
    >
      {/* Hidden input for form submission if needed */}
      <input type="hidden" name={name} value={value} />

      <div 
        className={`dropdown-trigger ${value ? 'has-value' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <span className={value ? 'dropdown-value' : 'dropdown-placeholder'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <div className="dropdown-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
      </div>

      <div className="dropdown-menu">
        {options.map((option) => (
          <div
            key={option.value}
            className={`dropdown-option ${value === option.value ? 'selected' : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}
