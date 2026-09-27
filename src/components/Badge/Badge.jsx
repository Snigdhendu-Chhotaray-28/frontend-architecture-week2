import React from 'react';
import './Badge.css';

/**
 * Reusable Badge / Tag Component
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'} [props.variant='primary'] - Visual category color
 * @param {'small' | 'medium' | 'large'} [props.size='medium'] - Badge scale
 * @param {boolean} [props.pill=false] - Fully rounded pill border radius
 * @param {boolean} [props.dot=false] - Shows a status indicator dot
 * @param {React.ReactNode} [props.icon] - Optional leading icon
 * @param {string} [props.className=''] - Additional custom CSS class
 * @param {React.ReactNode} props.children - Badge content text
 */
export const Badge = ({
  variant = 'primary',
  size = 'medium',
  pill = false,
  dot = false,
  icon = null,
  className = '',
  children,
  ...props
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill ? 'badge--pill' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
      <span className="badge__text">{children}</span>
    </span>
  );
};

export default Badge;
