import React, {
  DetailedHTMLProps,
  forwardRef,
  ButtonHTMLAttributes,
} from 'react';
import cx from 'classnames';

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className={cx(
        'text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 border-2 border-gray-900 bg-blue-600 p-2 rounded w-full',
        className
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
