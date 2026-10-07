import { ArrowUpRight } from 'lucide-react';

const variants = {
  primary: 'btn btn-primary',
  solid: 'btn btn-solid',
  outline: 'btn btn-outline',
  blue: 'btn btn-blue',
};

/**
 * Link-or-button. External links open in a new tab with an arrow icon (functional cue).
 */
export default function Button({
  href,
  external = false,
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const cls = `${variants[variant] || variants.primary} ${className}`.trim();
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={cls} {...ext} {...rest}>
        <span>{children}</span>
        {external && <ArrowUpRight size={16} aria-hidden="true" />}
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      <span>{children}</span>
    </button>
  );
}
