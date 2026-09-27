import React from 'react';
import './Card.css';

/**
 * Reusable Card Component
 *
 * @param {Object} props
 * @param {string} [props.title] - Card header title
 * @param {string} [props.subtitle] - Card sub-heading or timestamp
 * @param {string} [props.description] - Main text body
 * @param {string} [props.image] - URL of cover image
 * @param {string} [props.imageAlt=''] - Accessible alt text for cover image
 * @param {React.ReactNode} [props.badge] - Optional badge or category label
 * @param {React.ReactNode} [props.headerAction] - Optional top-right action / icon
 * @param {React.ReactNode} [props.footer] - Footer actions or buttons
 * @param {'vertical' | 'horizontal'} [props.orientation='vertical'] - Card layout direction
 * @param {boolean} [props.hoverable=true] - Applies subtle hover lift animation
 * @param {Function} [props.onClick] - Optional click handler for entire card
 * @param {string} [props.className=''] - Additional custom CSS class
 * @param {React.ReactNode} [props.children] - Flexible custom children body
 */
export const Card = ({
  title,
  subtitle,
  description,
  image,
  imageAlt = '',
  badge,
  headerAction,
  footer,
  orientation = 'vertical',
  hoverable = true,
  onClick,
  className = '',
  children,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${orientation}`,
    hoverable ? 'card--hoverable' : '',
    onClick ? 'card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={cardClasses}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {image && (
        <div className="card__media">
          <img src={image} alt={imageAlt || title || 'Card thumbnail'} className="card__img" loading="lazy" />
        </div>
      )}

      <div className="card__body">
        {(badge || headerAction) && (
          <div className="card__meta">
            {badge && <div className="card__badge">{badge}</div>}
            {headerAction && <div className="card__header-action">{headerAction}</div>}
          </div>
        )}

        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {description && <p className="card__description">{description}</p>}

        {children && <div className="card__custom-content">{children}</div>}

        {footer && <div className="card__footer">{footer}</div>}
      </div>
    </article>
  );
};

export default Card;
