import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonSize = 'small' | 'medium';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}: ButtonProps) {
  const buttonClassName = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClassName} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;