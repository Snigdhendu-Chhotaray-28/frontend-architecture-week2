import React, { useId } from 'react';
import './Select.css';

/**
 * Reusable Accessible Select / Dropdown Component
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {string} [props.id] - Element ID; auto-generated if omitted
 * @param {string} [props.name] - Native select name attribute
 * @param {string|number} [props.value] - Controlled selected value
 * @param {string|number} [props.defaultValue] - Uncontrolled initial value
 * @param {Array<{value: string|number, label: string, disabled?: boolean}>|string[]} [props.options=[]] - Select options list
 * @param {string} [props.placeholder] - Default placeholder prompt
 * @param {boolean} [props.required=false] - Mandatory selection
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.error] - Error message
 * @param {string} [props.helperText] - Helper guidance text
 * @param {Function} [props.onChange] - Value change callback
 * @param {string} [props.className=''] - Custom CSS class
 */
export const Select = ({
  label,
  id,
  name,
  value,
  defaultValue,
  options = [],
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error = '',
  helperText = '',
  onChange,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  const hasError = Boolean(error);
  const describedBy = [
    hasError ? errorId : null,
    helperText ? helperId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div
      className={`select-field ${hasError ? 'select-field--error' : ''} ${
        disabled ? 'select-field--disabled' : ''
      } ${className}`}
    >
      {label && (
        <label htmlFor={selectId} className="select-field__label">
          {label}
          {required && <span className="select-field__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="select-field__wrapper">
        <select
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={onChange}
          aria-invalid={hasError}
          aria-required={required}
          aria-describedby={describedBy}
          className="select-field__select"
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden={required}>
              {placeholder}
            </option>
          )}

          {options.map((option, index) => {
            if (typeof option === 'string' || typeof option === 'number') {
              return (
                <option key={`${option}-${index}`} value={option}>
                  {option}
                </option>
              );
            }
            return (
              <option key={option.value || index} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            );
          })}
        </select>

        <span className="select-field__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>

      {hasError && (
        <p id={errorId} className="select-field__error-msg" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="select-field__helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
