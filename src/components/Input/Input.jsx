import React, { useState, useId } from 'react';
import './Input.css';

/**
 * Reusable Input / Form Field Component
 *
 * @param {Object} props
 * @param {string} [props.label] - Label text displayed above input
 * @param {string} [props.id] - Optional custom ID; auto-generated if omitted
 * @param {string} [props.type='text'] - Input type (text, email, password, etc.)
 * @param {string} [props.name] - Input name attribute
 * @param {string|number} [props.value] - Controlled input value
 * @param {string|number} [props.defaultValue] - Uncontrolled initial value
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.required=false] - Marks field as mandatory
 * @param {boolean} [props.disabled=false] - Disables the input
 * @param {string} [props.error] - Error message string (triggers error styling)
 * @param {string} [props.helperText] - Supporting guide text
 * @param {React.ReactNode} [props.startIcon] - Icon at start of input
 * @param {React.ReactNode} [props.endIcon] - Icon at end of input
 * @param {Function} [props.onChange] - Change event handler
 * @param {Function} [props.onBlur] - Blur event handler
 * @param {string} [props.className=''] - Additional custom CSS class
 */
export const Input = ({
  label,
  id,
  type = 'text',
  name,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  error = '',
  helperText = '',
  startIcon = null,
  endIcon = null,
  onChange,
  onBlur,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const effectiveType = isPasswordField && showPassword ? 'text' : type;

  const hasError = Boolean(error);
  const describedBy = [
    hasError ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div
      className={`form-field ${hasError ? 'form-field--error' : ''} ${
        disabled ? 'form-field--disabled' : ''
      } ${className}`}
    >
      {label && (
        <label htmlFor={inputId} className="form-field__label">
          {label}
          {required && <span className="form-field__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="form-field__input-wrapper">
        {startIcon && <span className="form-field__icon form-field__icon--start">{startIcon}</span>}

        <input
          id={inputId}
          name={name}
          type={effectiveType}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-required={required}
          aria-describedby={describedBy}
          className={`form-field__input ${startIcon ? 'form-field__input--has-start' : ''} ${
            endIcon || isPasswordField ? 'form-field__input--has-end' : ''
          }`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            className="form-field__toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={0}
            disabled={disabled}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        )}

        {!isPasswordField && endIcon && (
          <span className="form-field__icon form-field__icon--end">{endIcon}</span>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="form-field__error-msg" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="form-field__helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
