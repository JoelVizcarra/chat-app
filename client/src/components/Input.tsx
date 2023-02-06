import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from 'react';
import cx from 'classnames';

const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...rest }, ref) => {
  return (
    <input
      className={cx(
        'py-1 px-2 border border-gray-400 focus:border-blue-500 outline-none rounded w-full',
        className
      )}
      {...rest}
      ref={ref}
    />
  );
});

export default Input;
