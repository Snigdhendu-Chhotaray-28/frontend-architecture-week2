import React, { useState } from 'react';
import './Alert.css';

/**
 * Reusable Alert / Notification Component
 *
 * @param {Object} props
 * @param {'info' | 'success' | 'warning' | 'error'} [props.type='info'] - Visual type / severity level
 * @param {string} [props.title] - Optional bold header title
 * @param {string} [props.message] - Alert message text
 * @param {boolean} [props.dismissible=false] - Whether alert shows a close dismiss button
 * @param {Function} [props.onClose] - Callback when alert is dismissed
 * @param {React.ReactNode} [props.icon] - Optional custom leading icon
 * @param {string} [props.className=''] - Additional custom CSS class
 * @param {React.ReactNode} [props.children] - Custom content inside alert
 */
export const Alert = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  onClose,
  icon,
  className = '',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onClose?.();
  };

  // Built-in accessible icons for alert types
  const renderDefaultIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'warning':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'error':
      case 'danger':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 'info':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  const effectiveType = type === 'danger' ? 'error' : type;

  return (
    <div
      className={`alert alert--${effectiveType} ${className}`}
      role={effectiveType === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div className="alert__icon" aria-hidden="true">
        {icon || renderDefaultIcon()}
      </div>

      <div className="alert__content">
        {title && <h4 className="alert__title">{title}</h4>}
        {message && <p className="alert__message">{message}</p>}
        {children}
      </div>

      {dismissible && (
        <button
          type="button"
          className="alert__close-btn"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
