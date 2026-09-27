import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'} [props.variant='primary'] - Visual style of the button
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Size of the button
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {boolean} [props.loading=false] - Shows loading spinner and disables interaction
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Native button type
 * @param {boolean} [props.fullWidth=false] - If true, button occupies 100% width
 * @param {React.ReactNode} [props.icon] - Optional icon element
 * @param {'left' | 'right'} [props.iconPosition='left'] - Position of the icon
 * @param {Function} [props.onClick] - Click handler function
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.ariaLabel] - Accessible label for screen readers
 * @param {React.ReactNode} props.children - Button label / content
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  type = 'button',
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  className = '',
  ariaLabel,
  children,
  ...props
}) => {
  const isButtonDisabled = disabled || loading;

  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    loading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classNames}
      disabled={isButtonDisabled}
      onClick={onClick}
      aria-disabled={isButtonDisabled}
      aria-busy={loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="btn__spinner-svg" viewBox="0 0 24 24" fill="none">
            <circle
              className="btn__spinner-track"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="btn__spinner-head"
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}

      {!loading && icon && iconPosition === 'left' && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}

      <span className="btn__content">{children}</span>

      {!loading && icon && iconPosition === 'right' && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
